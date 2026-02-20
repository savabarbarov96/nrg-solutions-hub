import { useMemo, useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AdminLayout } from '@/components/admin/AdminLayout';
import {
  usePricingPackages,
  useUpdatePricingPackage,
  usePricingOfferCards,
  useUpdatePricingOfferCard,
  useUploadPricingOfferCardImage,
} from '@/hooks/usePricing';
import { DynamicListField } from '@/components/admin/DynamicListField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Pencil, Check, Upload } from 'lucide-react';
import { toast } from 'sonner';
import type { PricingOfferCard, PricingOfferCardUpdate, PricingPackage } from '@/types/database';

const pricingFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  power: z.string().min(1, 'Power is required'),
  price_eur: z.number().min(0, 'Price must be positive'),
  description: z.string().min(1, 'Description is required'),
  ideal_for: z.string().min(1, 'Ideal for is required'),
  popular: z.boolean(),
  includes: z.array(z.string()).min(1, 'At least one item is required'),
});

const offerCardFormSchema = z.object({
  display_order: z.number().int().min(1, 'Display order must be 1 or higher'),
  price_text: z.string().min(1, 'Price is required'),
  short_title: z.string().min(1, 'Title is required'),
  includes_text: z.string().min(1, 'Includes text is required'),
  headline_line_1: z.string().min(1, 'Headline line 1 is required'),
  headline_line_2: z.string().min(1, 'Headline line 2 is required'),
  headline_line_3: z.string().min(1, 'Headline line 3 is required'),
  headline_line_4: z.string().min(1, 'Headline line 4 is required'),
  inverter_model: z.string().min(1, 'Inverter model is required'),
  battery_model: z.string().min(1, 'Battery model is required'),
  panels_count: z.number().int().min(1, 'Panel count is required'),
  cta_text: z.string().min(1, 'CTA text is required'),
  cta_href: z.string().min(1, 'CTA link is required'),
  hero_image: z.string().min(1, 'Hero image is required'),
  inverter_image: z.string().min(1, 'Inverter image is required'),
  battery_image: z.string().min(1, 'Battery image is required'),
  panels_image: z.string().min(1, 'Panel image is required'),
});

type PricingFormData = z.infer<typeof pricingFormSchema>;
type OfferCardFormData = z.infer<typeof offerCardFormSchema>;
type OfferImageField = 'hero_image' | 'inverter_image' | 'battery_image' | 'panels_image';
type OfferImageSlot = 'hero' | 'inverter' | 'battery' | 'panels';

interface OfferImageUploadTileProps {
  label: string;
  hint: string;
  imageUrl: string;
  inputId: string;
  isUploading: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function OfferImageUploadTile({
  label,
  hint,
  imageUrl,
  inputId,
  isUploading,
  onChange,
}: OfferImageUploadTileProps) {
  return (
    <div className="space-y-2 rounded-xl border border-border/70 bg-muted/20 p-3">
      <div className="space-y-0.5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-white p-1.5">
          <img src={imageUrl} alt={label} className="h-full w-full object-contain" />
        </div>
        <div className="space-y-2">
          <input
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onChange}
            className="hidden"
          />
          <label htmlFor={inputId}>
            <Button type="button" variant="outline" size="sm" className="gap-2" asChild>
              <span>
                <Upload className="h-4 w-4" />
                {isUploading ? 'Uploading...' : 'Upload image'}
              </span>
            </Button>
          </label>
        </div>
      </div>
    </div>
  );
}

export default function PricingManagement() {
  const { data: packages, isLoading: isPackagesLoading } = usePricingPackages();
  const { data: offerCards, isLoading: isOfferCardsLoading } = usePricingOfferCards();
  const updatePackageMutation = useUpdatePricingPackage();
  const saveOfferCardMutation = useUpdatePricingOfferCard();
  const patchOfferCardMutation = useUpdatePricingOfferCard();
  const uploadOfferCardImageMutation = useUploadPricingOfferCardImage();

  const [editingPackage, setEditingPackage] = useState<PricingPackage | null>(null);
  const [editingOfferCard, setEditingOfferCard] = useState<PricingOfferCard | null>(null);
  const [uploadingImageField, setUploadingImageField] = useState<OfferImageField | null>(null);

  const packageForm = useForm<PricingFormData>({
    resolver: zodResolver(pricingFormSchema),
  });

  const offerCardForm = useForm<OfferCardFormData>({
    resolver: zodResolver(offerCardFormSchema),
  });

  const packageIncludes = packageForm.watch('includes');
  const packagePopular = packageForm.watch('popular');
  const heroImage = offerCardForm.watch('hero_image');
  const inverterImage = offerCardForm.watch('inverter_image');
  const batteryImage = offerCardForm.watch('battery_image');
  const panelsImage = offerCardForm.watch('panels_image');

  const sortedOfferCards = useMemo(
    () => [...(offerCards || [])].sort((a, b) => a.display_order - b.display_order),
    [offerCards]
  );

  const handleEditPackage = (pkg: PricingPackage) => {
    setEditingPackage(pkg);
    packageForm.reset({
      name: pkg.name,
      power: pkg.power,
      price_eur: pkg.price_eur,
      description: pkg.description,
      ideal_for: pkg.ideal_for,
      popular: pkg.popular,
      includes: pkg.includes,
    });
  };

  const handleEditOfferCard = (card: PricingOfferCard) => {
    setEditingOfferCard(card);
    offerCardForm.reset({
      display_order: card.display_order,
      price_text: card.price_text,
      short_title: card.short_title,
      includes_text: card.includes_text,
      headline_line_1: card.headline_lines[0] || '',
      headline_line_2: card.headline_lines[1] || '',
      headline_line_3: card.headline_lines[2] || '',
      headline_line_4: card.headline_lines[3] || '',
      inverter_model: card.inverter_model,
      battery_model: card.battery_model,
      panels_count: card.panels_count,
      cta_text: card.cta_text,
      cta_href: card.cta_href,
      hero_image: card.hero_image,
      inverter_image: card.inverter_image,
      battery_image: card.battery_image,
      panels_image: card.panels_image,
    });
  };

  const closePackageDialog = () => {
    setEditingPackage(null);
    packageForm.reset();
  };

  const closeOfferCardDialog = () => {
    setEditingOfferCard(null);
    setUploadingImageField(null);
    offerCardForm.reset();
  };

  const submitPackage = async (data: PricingFormData) => {
    if (!editingPackage) return;

    try {
      await updatePackageMutation.mutateAsync({ id: editingPackage.id, updates: data });
      toast.success('Pricing package updated successfully');
      closePackageDialog();
    } catch (error) {
      toast.error('Failed to update pricing package');
      console.error(error);
    }
  };

  const submitOfferCard = async (data: OfferCardFormData) => {
    if (!editingOfferCard) return;

    try {
      await saveOfferCardMutation.mutateAsync({
        id: editingOfferCard.id,
        updates: {
          display_order: data.display_order,
          price_text: data.price_text,
          short_title: data.short_title,
          includes_text: data.includes_text,
          headline_lines: [data.headline_line_1, data.headline_line_2, data.headline_line_3, data.headline_line_4],
          inverter_model: data.inverter_model,
          battery_model: data.battery_model,
          panels_count: data.panels_count,
          cta_text: data.cta_text,
          cta_href: data.cta_href,
          hero_image: data.hero_image,
          inverter_image: data.inverter_image,
          battery_image: data.battery_image,
          panels_image: data.panels_image,
        },
      });
      toast.success('Offer card updated successfully');
      closeOfferCardDialog();
    } catch (error) {
      toast.error('Failed to update offer card');
      console.error(error);
    }
  };

  const handleOfferImageUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    field: OfferImageField,
    slot: OfferImageSlot
  ) => {
    if (!editingOfferCard) return;
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast.error('Image is too large (max 8MB)');
      return;
    }

    setUploadingImageField(field);
    try {
      const publicUrl = await uploadOfferCardImageMutation.mutateAsync({
        id: editingOfferCard.id,
        slot,
        file,
      });

      offerCardForm.setValue(field, publicUrl, { shouldDirty: true, shouldValidate: true });

      await patchOfferCardMutation.mutateAsync({
        id: editingOfferCard.id,
        updates: { [field]: publicUrl } as PricingOfferCardUpdate,
      });

      toast.success('Image uploaded and linked to this card');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setUploadingImageField(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pricing Management</h1>
          <p className="text-muted-foreground">Manage standard pricing packages and offer banner cards.</p>
        </div>

        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold">Base Pricing Packages</h2>
            <p className="text-sm text-muted-foreground">Current 8/12/15 kW package cards.</p>
          </div>

          {isPackagesLoading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          ) : packages && packages.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {packages.map((pkg) => (
                <Card key={pkg.id} className={pkg.popular ? 'border-primary shadow-lg' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{pkg.power}</p>
                      </div>
                      {pkg.popular && (
                        <span className="rounded bg-primary px-2 py-1 text-xs text-primary-foreground">
                          Popular
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-3xl font-bold">€{pkg.price_eur}</p>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                    <div className="pt-2">
                      <p className="mb-2 text-sm font-medium">Includes:</p>
                      <ul className="space-y-1">
                        {pkg.includes.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                        {pkg.includes.length > 3 && (
                          <li className="text-sm text-muted-foreground">+{pkg.includes.length - 3} more...</li>
                        )}
                      </ul>
                    </div>
                    <Button variant="outline" className="mt-4 w-full gap-2" onClick={() => handleEditPackage(pkg)}>
                      <Pencil className="h-4 w-4" />
                      Edit Package
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No pricing packages found</p>
              </CardContent>
            </Card>
          )}
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold">Offer Banner Cards</h2>
            <p className="text-sm text-muted-foreground">Short edit form + direct image uploads.</p>
          </div>

          {isOfferCardsLoading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          ) : sortedOfferCards.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {sortedOfferCards.map((card) => (
                <Card key={card.id}>
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-base">{card.short_title}</CardTitle>
                      <span className="rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                        #{card.display_order}
                      </span>
                    </div>
                    <p className="text-2xl font-bold">{card.price_text}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="h-24 overflow-hidden rounded-lg border border-border/70 bg-muted/20">
                      <img src={card.hero_image} alt={card.short_title} className="h-full w-full object-cover" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-md border border-border/70 bg-white p-1.5">
                        <img src={card.panels_image} alt="Panels" className="h-14 w-full object-contain" />
                      </div>
                      <div className="rounded-md border border-border/70 bg-white p-1.5">
                        <img src={card.inverter_image} alt="Inverter" className="h-14 w-full object-contain" />
                      </div>
                      <div className="rounded-md border border-border/70 bg-white p-1.5">
                        <img src={card.battery_image} alt="Battery" className="h-14 w-full object-contain" />
                      </div>
                    </div>
                    <Button variant="outline" className="w-full gap-2" onClick={() => handleEditOfferCard(card)}>
                      <Pencil className="h-4 w-4" />
                      Edit Offer Card
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No offer cards found</p>
              </CardContent>
            </Card>
          )}
        </section>
      </div>

      <Dialog open={editingPackage !== null} onOpenChange={closePackageDialog}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Pricing Package</DialogTitle>
            <DialogDescription>Update the details for the {editingPackage?.name} package.</DialogDescription>
          </DialogHeader>

          <form onSubmit={packageForm.handleSubmit(submitPackage)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" {...packageForm.register('name')} />
              {packageForm.formState.errors.name && (
                <p className="text-sm text-destructive">{packageForm.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="power">Power *</Label>
              <Input id="power" {...packageForm.register('power')} placeholder="12 kW" />
              {packageForm.formState.errors.power && (
                <p className="text-sm text-destructive">{packageForm.formState.errors.power.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price_eur">Price (EUR) *</Label>
              <Input
                id="price_eur"
                type="number"
                {...packageForm.register('price_eur', { valueAsNumber: true })}
                placeholder="7750"
              />
              {packageForm.formState.errors.price_eur && (
                <p className="text-sm text-destructive">{packageForm.formState.errors.price_eur.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" {...packageForm.register('description')} rows={3} />
              {packageForm.formState.errors.description && (
                <p className="text-sm text-destructive">{packageForm.formState.errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ideal_for">Ideal For *</Label>
              <Input id="ideal_for" {...packageForm.register('ideal_for')} />
              {packageForm.formState.errors.ideal_for && (
                <p className="text-sm text-destructive">{packageForm.formState.errors.ideal_for.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="popular"
                checked={packagePopular}
                onCheckedChange={(checked) => packageForm.setValue('popular', checked as boolean)}
              />
              <Label htmlFor="popular" className="cursor-pointer font-normal">
                Mark as popular package
              </Label>
            </div>

            <DynamicListField
              label="Includes *"
              value={packageIncludes || []}
              onChange={(value) => packageForm.setValue('includes', value)}
              placeholder="Enter included item"
            />
            {packageForm.formState.errors.includes && (
              <p className="text-sm text-destructive">{packageForm.formState.errors.includes.message}</p>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={closePackageDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={updatePackageMutation.isPending}>
                {updatePackageMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={editingOfferCard !== null} onOpenChange={closeOfferCardDialog}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Offer Banner Card</DialogTitle>
            <DialogDescription>
              Short content fields. Uploads are direct and linked to the current card.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={offerCardForm.handleSubmit(submitOfferCard)} className="space-y-5">
            <input type="hidden" {...offerCardForm.register('hero_image')} />
            <input type="hidden" {...offerCardForm.register('inverter_image')} />
            <input type="hidden" {...offerCardForm.register('battery_image')} />
            <input type="hidden" {...offerCardForm.register('panels_image')} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order *</Label>
                <Input id="display_order" type="number" {...offerCardForm.register('display_order', { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price_text">Price *</Label>
                <Input id="price_text" {...offerCardForm.register('price_text')} placeholder="6650€ с ДДС" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="short_title">Title *</Label>
                <Input id="short_title" {...offerCardForm.register('short_title')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="includes_text">Includes *</Label>
                <Input id="includes_text" {...offerCardForm.register('includes_text')} />
              </div>
            </div>

            <div className="rounded-xl border border-border/70 p-4">
              <p className="mb-3 text-sm font-semibold">Headline (4 lines)</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input {...offerCardForm.register('headline_line_1')} />
                <Input {...offerCardForm.register('headline_line_2')} />
                <Input {...offerCardForm.register('headline_line_3')} />
                <Input {...offerCardForm.register('headline_line_4')} />
              </div>
            </div>

            <div className="rounded-xl border border-border/70 p-4">
              <p className="mb-3 text-sm font-semibold">Equipment + CTA</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="inverter_model">Inverter model *</Label>
                  <Input id="inverter_model" {...offerCardForm.register('inverter_model')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="battery_model">Battery model *</Label>
                  <Textarea id="battery_model" rows={2} {...offerCardForm.register('battery_model')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="panels_count">Panel count *</Label>
                  <Input id="panels_count" type="number" {...offerCardForm.register('panels_count', { valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta_text">CTA text *</Label>
                  <Input id="cta_text" {...offerCardForm.register('cta_text')} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="cta_href">CTA link *</Label>
                  <Input id="cta_href" {...offerCardForm.register('cta_href')} placeholder="tel:+359..." />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border/70 p-4">
              <p className="mb-3 text-sm font-semibold">Images (upload)</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <OfferImageUploadTile
                  label="Hero"
                  hint="Card background"
                  imageUrl={heroImage}
                  inputId="offer-hero-upload"
                  isUploading={uploadingImageField === 'hero_image'}
                  onChange={(event) => handleOfferImageUpload(event, 'hero_image', 'hero')}
                />
                <OfferImageUploadTile
                  label="Inverter"
                  hint="Product image"
                  imageUrl={inverterImage}
                  inputId="offer-inverter-upload"
                  isUploading={uploadingImageField === 'inverter_image'}
                  onChange={(event) => handleOfferImageUpload(event, 'inverter_image', 'inverter')}
                />
                <OfferImageUploadTile
                  label="Battery"
                  hint="Product image"
                  imageUrl={batteryImage}
                  inputId="offer-battery-upload"
                  isUploading={uploadingImageField === 'battery_image'}
                  onChange={(event) => handleOfferImageUpload(event, 'battery_image', 'battery')}
                />
                <OfferImageUploadTile
                  label="Panel"
                  hint="Product image"
                  imageUrl={panelsImage}
                  inputId="offer-panels-upload"
                  isUploading={uploadingImageField === 'panels_image'}
                  onChange={(event) => handleOfferImageUpload(event, 'panels_image', 'panels')}
                />
              </div>
            </div>

            {offerCardForm.formState.errors.hero_image && (
              <p className="text-sm text-destructive">{offerCardForm.formState.errors.hero_image.message}</p>
            )}
            {offerCardForm.formState.errors.inverter_image && (
              <p className="text-sm text-destructive">{offerCardForm.formState.errors.inverter_image.message}</p>
            )}
            {offerCardForm.formState.errors.battery_image && (
              <p className="text-sm text-destructive">{offerCardForm.formState.errors.battery_image.message}</p>
            )}
            {offerCardForm.formState.errors.panels_image && (
              <p className="text-sm text-destructive">{offerCardForm.formState.errors.panels_image.message}</p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={closeOfferCardDialog}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saveOfferCardMutation.isPending || uploadOfferCardImageMutation.isPending}
              >
                {saveOfferCardMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
