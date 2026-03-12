'use client'

export default function ImageSkeleton() {
  return (
    <div className="relative w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse">
      <div className="aspect-video" />
    </div>
  )
}
