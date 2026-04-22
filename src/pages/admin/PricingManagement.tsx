import { useMemo, useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AdminLayout } from '@/components/admin/AdminLayout';
import {
  usePricingOfferCards,
  useUpdatePricingOfferCard,
  useUploadPricingOfferCardImage,
} from '@/hooks/usePricing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Pencil, Upload } from 'lucide-react';
import { toast } from 'sonner';
import type { PricingOfferCard, PricingOfferCardUpdate } from '@/types/database';
import { pricingOfferCategories, type PricingOfferCategoryId } from '@/content/pricing-offers';

const offerCardFormSchema = z.object({
  display_order: z.number().int().min(1, 'Display order must be 1 or higher'),
  price_text: z.string().min(1, 'Price is required'),
  price_note: z.string(),
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

const categoryOrder: PricingOfferCategoryId[] = ['mono-lv', '3phase-lv', '3phase-hv'];

export default function PricingManagement() {
  const { data: offerCards, isLoading: isOfferCardsLoading } = usePricingOfferCards();
  const saveOfferCardMutation = useUpdatePricingOfferCard();
  const patchOfferCardMutation = useUpdatePricingOfferCard();
  const uploadOfferCardImageMutation = useUploadPricingOfferCardImage();

  const [editingOfferCard, setEditingOfferCard] = useState<PricingOfferCard | null>(null);
  const [uploadingImageField, setUploadingImageField] = useState<OfferImageField | null>(null);

  const offerCardForm = useForm<OfferCardFormData>({
    resolver: zodResolver(offerCardFormSchema),
  });

  const heroImage = offerCardForm.watch('hero_image');
  const inverterImage = offerCardForm.watch('inverter_image');
  const batteryImage = offerCardForm.watch('battery_image');
  const panelsImage = offerCardForm.watch('panels_image');

  const groupedOfferCards = useMemo(() => {
    const groups: Record<PricingOfferCategoryId, PricingOfferCard[]> = {
      'mono-lv': [],
      '3phase-lv': [],
      '3phase-hv': [],
    };
    for (const card of offerCards || []) {
      const category = (card.category ?? 'mono-lv') as PricingOfferCategoryId;
      if (groups[category]) {
        groups[category].push(card);
      }
    }
    for (const key of categoryOrder) {
      groups[key].sort((a, b) => a.display_order - b.display_order);
    }
    return groups;
  }, [offerCards]);

  const editingCategoryMeta = editingOfferCard
    ? pricingOfferCategories[(editingOfferCard.category ?? 'mono-lv') as PricingOfferCategoryId]
    : null;

  const handleEditOfferCard = (card: PricingOfferCard) => {
    setEditingOfferCard(card);
    offerCardForm.reset({
      display_order: card.display_order,
      price_text: card.price_text,
      price_note: card.price_note ?? '',
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

  const closeOfferCardDialog = () => {
    setEditingOfferCard(null);
    setUploadingImageField(null);
    offerCardForm.reset();
  };

  const submitOfferCard = async (data: OfferCardFormData) => {
    if (!editingOfferCard) return;

    try {
      await saveOfferCardMutation.mutateAsync({
        id: editingOfferCard.id,
        updates: {
          display_order: data.display_order,
          price_text: data.price_text,
          price_note: data.price_note.trim() === '' ? null : data.price_note.trim(),
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
      toast.success('Офертата е обновена успешно');
      closeOfferCardDialog();
    } catch (error) {
      toast.error('Неуспешно обновяване на офертата');
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
      toast.error('Моля изберете файл с изображение');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast.error('Изображението е твърде голямо (макс 8MB)');
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

      toast.success('Изображението е качено и свързано с офертата');
    } catch (error) {
      toast.error('Неуспешно качване на изображение');
      console.error(error);
    } finally {
      setUploadingImageField(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Управление на оферти</h1>
          <p className="text-muted-foreground">
            Редактирайте 6-те пакетни оферти, групирани по категория. Качването на изображения е директно към активната оферта.
          </p>
        </div>

        {isOfferCardsLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : (
          categoryOrder.map((categoryId) => {
            const meta = pricingOfferCategories[categoryId];
            const cards = groupedOfferCards[categoryId];
            return (
              <section key={categoryId} className="space-y-4">
                <div className="flex flex-col gap-1 border-l-4 border-accent pl-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    {meta.eyebrow}
                  </span>
                  <h2 className="text-xl font-semibold text-foreground">{meta.title}</h2>
                  <p className="text-sm text-muted-foreground">{meta.subtitle}</p>
                </div>

                {cards.length === 0 ? (
                  <Card>
                    <CardContent className="py-6 text-center text-sm text-muted-foreground">
                      Няма оферти в тази категория. Изпълнете миграцията на базата данни.
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {cards.map((card) => (
                      <Card key={card.id}>
                        <CardHeader className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <CardTitle className="text-base">{card.short_title}</CardTitle>
                            <span className="rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                              #{card.display_order}
                            </span>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{card.price_text}</p>
                            {card.price_note && (
                              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                {card.price_note}
                              </p>
                            )}
                          </div>
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
                            Редактирай оферта
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </section>
            );
          })
        )}
      </div>

      <Dialog open={editingOfferCard !== null} onOpenChange={closeOfferCardDialog}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактирай оферта</DialogTitle>
            <DialogDescription>
              Кратки полета за съдържание. Качването на изображения е директно и се привързва към текущата оферта.
            </DialogDescription>
          </DialogHeader>

          {editingCategoryMeta && (
            <div className="flex items-center gap-2 rounded-lg border border-border/70 bg-muted/30 px-3 py-2 text-xs">
              <span className="font-semibold uppercase tracking-[0.12em] text-accent">Категория</span>
              <span className="font-medium text-foreground">{editingCategoryMeta.title}</span>
              <span className="ml-auto text-muted-foreground">{editingOfferCard?.id}</span>
            </div>
          )}

          <form onSubmit={offerCardForm.handleSubmit(submitOfferCard)} className="space-y-5">
            <input type="hidden" {...offerCardForm.register('hero_image')} />
            <input type="hidden" {...offerCardForm.register('inverter_image')} />
            <input type="hidden" {...offerCardForm.register('battery_image')} />
            <input type="hidden" {...offerCardForm.register('panels_image')} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="display_order">Ред на показване *</Label>
                <Input id="display_order" type="number" {...offerCardForm.register('display_order', { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price_text">Цена *</Label>
                <Input id="price_text" {...offerCardForm.register('price_text')} placeholder="6 320 €" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price_note">Забележка към цената</Label>
                <Input id="price_note" {...offerCardForm.register('price_note')} placeholder="без ДДС" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="short_title">Заглавие *</Label>
                <Input id="short_title" {...offerCardForm.register('short_title')} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="includes_text">Включва *</Label>
                <Input id="includes_text" {...offerCardForm.register('includes_text')} />
              </div>
            </div>

            <div className="rounded-xl border border-border/70 p-4">
              <p className="mb-3 text-sm font-semibold">Заглавие на банера (4 реда)</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input {...offerCardForm.register('headline_line_1')} />
                <Input {...offerCardForm.register('headline_line_2')} />
                <Input {...offerCardForm.register('headline_line_3')} />
                <Input {...offerCardForm.register('headline_line_4')} />
              </div>
            </div>

            <div className="rounded-xl border border-border/70 p-4">
              <p className="mb-3 text-sm font-semibold">Оборудване + CTA</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="inverter_model">Инвертор модел *</Label>
                  <Input id="inverter_model" {...offerCardForm.register('inverter_model')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="battery_model">Батерия модел *</Label>
                  <Textarea id="battery_model" rows={2} {...offerCardForm.register('battery_model')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="panels_count">Брой панели *</Label>
                  <Input id="panels_count" type="number" {...offerCardForm.register('panels_count', { valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta_text">Бутон текст *</Label>
                  <Input id="cta_text" {...offerCardForm.register('cta_text')} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="cta_href">Бутон линк *</Label>
                  <Input id="cta_href" {...offerCardForm.register('cta_href')} placeholder="tel:+359..." />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border/70 p-4">
              <p className="mb-3 text-sm font-semibold">Изображения</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <OfferImageUploadTile
                  label="Hero"
                  hint="Фон на картата"
                  imageUrl={heroImage}
                  inputId="offer-hero-upload"
                  isUploading={uploadingImageField === 'hero_image'}
                  onChange={(event) => handleOfferImageUpload(event, 'hero_image', 'hero')}
                />
                <OfferImageUploadTile
                  label="Инвертор"
                  hint="Продуктова снимка"
                  imageUrl={inverterImage}
                  inputId="offer-inverter-upload"
                  isUploading={uploadingImageField === 'inverter_image'}
                  onChange={(event) => handleOfferImageUpload(event, 'inverter_image', 'inverter')}
                />
                <OfferImageUploadTile
                  label="Батерия"
                  hint="Продуктова снимка"
                  imageUrl={batteryImage}
                  inputId="offer-battery-upload"
                  isUploading={uploadingImageField === 'battery_image'}
                  onChange={(event) => handleOfferImageUpload(event, 'battery_image', 'battery')}
                />
                <OfferImageUploadTile
                  label="Панели"
                  hint="Продуктова снимка"
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
                Отказ
              </Button>
              <Button
                type="submit"
                disabled={saveOfferCardMutation.isPending || uploadOfferCardImageMutation.isPending}
              >
                {saveOfferCardMutation.isPending ? 'Запис...' : 'Запази промените'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
