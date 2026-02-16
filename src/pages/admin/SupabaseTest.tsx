import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SupabaseTest() {
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    const testResults: any = {};

    try {
      // Test 1: Check Supabase client configuration
      testResults.config = {
        url: import.meta.env.VITE_SUPABASE_URL || 'NOT SET',
        hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
      };

      // Test 2: Try to fetch projects
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*');

      testResults.projects = {
        success: !projectsError,
        count: projects?.length || 0,
        error: projectsError?.message,
        data: projects,
      };

      // Test 3: Try to fetch pricing
      const { data: pricing, error: pricingError } = await supabase
        .from('pricing_packages')
        .select('*');

      testResults.pricing = {
        success: !pricingError,
        count: pricing?.length || 0,
        error: pricingError?.message,
        data: pricing,
      };

      // Test 4: Try to fetch project images
      const { data: images, error: imagesError } = await supabase
        .from('project_images')
        .select('*');

      testResults.images = {
        success: !imagesError,
        count: images?.length || 0,
        error: imagesError?.message,
        data: images,
      };

    } catch (error: any) {
      testResults.fatalError = error.message;
    }

    setResults(testResults);
    setLoading(false);
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Supabase Connection Test</h1>
          <Button onClick={testConnection} disabled={loading}>
            {loading ? 'Testing...' : 'Re-test Connection'}
          </Button>
        </div>

        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(results.config, null, 2)}
            </pre>
          </CardContent>
        </Card>

        {/* Projects Test */}
        <Card>
          <CardHeader>
            <CardTitle className={results.projects?.success ? 'text-green-600' : 'text-red-600'}>
              Projects Table {results.projects?.success ? '✓' : '✗'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Count: {results.projects?.count || 0}</p>
            {results.projects?.error && (
              <p className="text-red-600 mb-2">Error: {results.projects.error}</p>
            )}
            <pre className="bg-slate-100 p-4 rounded text-sm overflow-auto max-h-96">
              {JSON.stringify(results.projects?.data, null, 2)}
            </pre>
          </CardContent>
        </Card>

        {/* Pricing Test */}
        <Card>
          <CardHeader>
            <CardTitle className={results.pricing?.success ? 'text-green-600' : 'text-red-600'}>
              Pricing Packages Table {results.pricing?.success ? '✓' : '✗'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Count: {results.pricing?.count || 0}</p>
            {results.pricing?.error && (
              <p className="text-red-600 mb-2">Error: {results.pricing.error}</p>
            )}
            <pre className="bg-slate-100 p-4 rounded text-sm overflow-auto max-h-96">
              {JSON.stringify(results.pricing?.data, null, 2)}
            </pre>
          </CardContent>
        </Card>

        {/* Images Test */}
        <Card>
          <CardHeader>
            <CardTitle className={results.images?.success ? 'text-green-600' : 'text-red-600'}>
              Project Images Table {results.images?.success ? '✓' : '✗'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Count: {results.images?.count || 0}</p>
            {results.images?.error && (
              <p className="text-red-600 mb-2">Error: {results.images.error}</p>
            )}
            <pre className="bg-slate-100 p-4 rounded text-sm overflow-auto max-h-96">
              {JSON.stringify(results.images?.data, null, 2)}
            </pre>
          </CardContent>
        </Card>

        {/* Fatal Error */}
        {results.fatalError && (
          <Card className="border-red-600">
            <CardHeader>
              <CardTitle className="text-red-600">Fatal Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-600">{results.fatalError}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
