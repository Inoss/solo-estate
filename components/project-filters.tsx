'use client'

import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ProjectFiltersProps {
  onFilterChange: (filters: FilterState) => void
  filters: FilterState
}

export interface FilterState {
  search: string
  status: string
  propertyType: string
  city: string
  minPrice: string
  maxPrice: string
  minYield: string
  sortBy: string
}

export function ProjectFilters({ onFilterChange, filters }: ProjectFiltersProps) {
  const t = useTranslations()

  const handleChange = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const handleReset = () => {
    onFilterChange({
      search: '',
      status: '',
      propertyType: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      minYield: '',
      sortBy: 'newest',
    })
  }

  return (
    <div className="space-y-6">
      {/* Main Horizontal Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* City */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">City</label>
          <Select value={filters.city} onValueChange={(value) => handleChange('city', value)}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="Tbilisi">Tbilisi</SelectItem>
              <SelectItem value="Batumi">Batumi</SelectItem>
              <SelectItem value="Kutaisi">Kutaisi</SelectItem>
              <SelectItem value="Rustavi">Rustavi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Property Type</label>
          <Select value={filters.propertyType} onValueChange={(value) => handleChange('propertyType', value)}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="aparthotel">Aparthotel</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Status</label>
          <Select value={filters.status} onValueChange={(value) => handleChange('status', value)}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="offPlan">Off-Plan</SelectItem>
              <SelectItem value="underConstruction">Under Construction</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Minimum Yield */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Min Yield (%)</label>
          <Input
            type="number"
            placeholder="e.g., 8"
            value={filters.minYield}
            onChange={(e) => handleChange('minYield', e.target.value)}
            className="bg-white"
          />
        </div>
      </div>

      {/* Price Range Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        <div className="lg:col-span-2">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Price Range (USD)</label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => handleChange('minPrice', e.target.value)}
              className="bg-white"
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
              className="bg-white"
            />
          </div>
        </div>

        {/* Search */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Search</label>
          <Input
            type="text"
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="bg-white"
          />
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          onClick={handleReset}
          className="gradient-gold text-white hover:opacity-90 px-8 h-11 font-bold shadow-lg"
        >
          Find Property
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="border-2 border-border hover:bg-secondary px-6 h-11 font-semibold"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
