import { client } from './sanity'

/**
 * Fetch service configuration by key
 * Controls which sections appear, layout options, and service-specific content
 */
export async function getServiceConfig(serviceKey: string) {
  try {
    const config = await client.fetch(
      `*[_type == "serviceConfig" && serviceKey == $serviceKey][0]`,
      { serviceKey }
    )
    return config || null
  } catch (error) {
    console.error(`Error fetching service config for ${serviceKey}:`, error)
    return null
  }
}

/**
 * Fetch all service packages for a service type
 */
export async function getServicePackages(category: string) {
  try {
    const packages = await client.fetch(
      `*[_type == "servicePackage" && category == $category] | order(displayOrder asc)`,
      { category }
    )
    return packages || []
  } catch (error) {
    console.error(`Error fetching packages for ${category}:`, error)
    return []
  }
}
