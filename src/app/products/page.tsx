"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/actions/categories";
import LoadingContent from "@/components/loading-content";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories", searchTerm],
    queryFn: () => getCategories(searchTerm),
  });

  const filteredCategories = categories?.filter((category: any) => category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || category?.description?.toLowerCase().includes(searchTerm?.toLowerCase())) || [];

  if (isLoading) return <LoadingContent />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Categories</h1>
          <p className="text-gray-600">Browse our comprehensive selection of medical products and supplies</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category: any) => (
            <Link
              key={category?.id}
              href={`/products/category/${category?.id}`}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group pt-0">
                <CardHeader className="p-0">
                  <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                    <img
                      src={category?.image || "/placeholder.jpg"}
                      alt={category?.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{category?.name}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 mb-4">{category?.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Browse →
                    </Button>
                    {category?._count?.products > 0 && <Badge variant="secondary">{category._count.products} products</Badge>}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Grid3X3 className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
