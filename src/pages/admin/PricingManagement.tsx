import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { usePricingPackages, useUpdatePricingPackage } from '@/hooks/usePricing';
import { DynamicListField } from '@/components/admin/DynamicListField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Pencil, Check } from 'lucide-react';
import { toast } from 'sonner';
import type { PricingPackage } from '@/types/database';

const pricingFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  power: z.string().min(1, 'Power is required'),
  price_eur: z.number().min(0, 'Price must be positive'),
  description: z.string().min(1, 'Description is required'),
  ideal_for: z.string().min(1, 'Ideal for is required'),
  popular: z.boolean(),
  includes: z.array(z.string()).min(1, 'At least one item is required'),
});

type PricingFormData = z.infer<typeof pricingFormSchema>;

export default function PricingManagement() {
  const { data: packages, isLoading } = usePricingPackages();
  const updateMutation = useUpdatePricingPackage();
  const [editingPackage, setEditingPackage] = useState<PricingPackage | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PricingFormData>({
    resolver: zodResolver(pricingFormSchema),
  });

  const includes = watch('includes');
  const popular = watch('popular');

  const handleEdit = (pkg: PricingPackage) => {
    setEditingPackage(pkg);
    reset({
      name: pkg.name,
      power: pkg.power,
      price_eur: pkg.price_eur,
      description: pkg.description,
      ideal_for: pkg.ideal_for,
      popular: pkg.popular,
      includes: pkg.includes,
    });
  };

  const handleClose = () => {
    setEditingPackage(null);
    reset();
  };

  const onSubmit = async (data: PricingFormData) => {
    if (!editingPackage) return;

    try {
      await updateMutation.mutateAsync({ id: editingPackage.id, updates: data });
      toast.success('Pricing package updated successfully');
      handleClose();
    } catch (error) {
      toast.error('Failed to update pricing package');
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pricing Management</h1>
          <p className="text-muted-foreground">Manage your solar package pricing and details</p>
        </div>

        {/* Pricing Cards */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : packages && packages.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={pkg.popular ? 'border-primary shadow-lg' : ''}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{pkg.power}</p>
                    </div>
                    {pkg.popular && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        Popular
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold">€{pkg.price_eur}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                  <div className="pt-2">
                    <p className="text-sm font-medium mb-2">Ideal for:</p>
                    <p className="text-sm text-muted-foreground">{pkg.ideal_for}</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm font-medium mb-2">Includes:</p>
                    <ul className="space-y-1">
                      {pkg.includes.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {pkg.includes.length > 3 && (
                        <li className="text-sm text-muted-foreground">
                          +{pkg.includes.length - 3} more...
                        </li>
                      )}
                    </ul>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full gap-2 mt-4"
                    onClick={() => handleEdit(pkg)}
                  >
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
      </div>

      {/* Edit Dialog */}
      <Dialog open={editingPackage !== null} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Pricing Package</DialogTitle>
            <DialogDescription>
              Update the details for the {editingPackage?.name} package
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            {/* Power */}
            <div className="space-y-2">
              <Label htmlFor="power">Power *</Label>
              <Input id="power" {...register('power')} placeholder="12 kW" />
              {errors.power && <p className="text-sm text-destructive">{errors.power.message}</p>}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price_eur">Price (EUR) *</Label>
              <Input
                id="price_eur"
                type="number"
                {...register('price_eur', { valueAsNumber: true })}
                placeholder="7750"
              />
              {errors.price_eur && (
                <p className="text-sm text-destructive">{errors.price_eur.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" {...register('description')} rows={3} />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            {/* Ideal For */}
            <div className="space-y-2">
              <Label htmlFor="ideal_for">Ideal For *</Label>
              <Input id="ideal_for" {...register('ideal_for')} />
              {errors.ideal_for && (
                <p className="text-sm text-destructive">{errors.ideal_for.message}</p>
              )}
            </div>

            {/* Popular */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="popular"
                checked={popular}
                onCheckedChange={(checked) => setValue('popular', checked as boolean)}
              />
              <Label htmlFor="popular" className="font-normal cursor-pointer">
                Mark as popular package
              </Label>
            </div>

            {/* Includes */}
            <DynamicListField
              label="Includes *"
              value={includes || []}
              onChange={(value) => setValue('includes', value)}
              placeholder="Enter included item"
            />
            {errors.includes && (
              <p className="text-sm text-destructive">{errors.includes.message}</p>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
