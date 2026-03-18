/**
 * Service component registry (deprecated)
 * 
 * NOTE: This file is no longer used. All service packages are now rendered
 * using the unified ServicePackageTemplate component which sources data
 * from servicePackage.addOns (single source of truth).
 * 
 * The old component-based approach (WeddingPackages, IndividualPackages, etc.)
 * has been consolidated into ServicePackageTemplate.tsx for maintainability.
 */

export const SERVICE_COMPONENT_REGISTRY: Record<string, React.ComponentType> = {};

export function getServiceComponent(componentName: string): React.ComponentType | null {
  return null;
}
