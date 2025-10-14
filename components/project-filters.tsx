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
    <div className="bg-card rounded-lg p-6 shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Reset All
        </Button>
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="text-sm font-medium mb-2 block">Search</label>
          <Input
            type="text"
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
          />
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium mb-2 block">Status</label>
          <Select value={filters.status} onValueChange={(value) => handleChange('status', value)}>
            <SelectTrigger>
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

        {/* Property Type */}
        <div>
          <label className="text-sm font-medium mb-2 block">Property Type</label>
          <Select value={filters.propertyType} onValueChange={(value) => handleChange('propertyType', value)}>
            <SelectTrigger>
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

        {/* City */}
        <div>
          <label className="text-sm font-medium mb-2 block">City</label>
          <Select value={filters.city} onValueChange={(value) => handleChange('city', value)}>
            <SelectTrigger>
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

        {/* Price Range */}
        <div>
          <label className="text-sm font-medium mb-2 block">Price Range (USD)</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleChange('minPrice', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        {/* Minimum Yield */}
        <div>
          <label className="text-sm font-medium mb-2 block">Minimum Yield (%)</label>
          <Input
            type="number"
            placeholder="e.g., 8"
            value={filters.minYield}
            onChange={(e) => handleChange('minYield', e.target.value)}
          />
        </div>

        {/* Sort By */}
        <div>
          <label className="text-sm font-medium mb-2 block">Sort By</label>
          <Select value={filters.sortBy} onValueChange={(value) => handleChange('sortBy', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="priceLow">Price: Low to High</SelectItem>
              <SelectItem value="priceHigh">Price: High to Low</SelectItem>
              <SelectItem value="yieldHigh">Highest Yield</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
