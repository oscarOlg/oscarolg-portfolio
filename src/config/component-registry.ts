/**
 * Service package component registry
 * Maps component names from config to actual React components
 * This enables dynamic component loading based on the services config
 */

import WeddingPackages from '@/app/services/components/WeddingPackages';
import IndividualPackages from '@/app/services/components/IndividualPackages';
import CouplePackages from '@/app/services/components/CouplePackages';
import MaternityPackages from '@/app/services/components/MaternityPackages';
import CommercialPackages from '@/app/services/components/CommercialPackages';
import EditorialPackages from '@/app/services/components/EditorialPackages';

export const SERVICE_COMPONENT_REGISTRY: Record<string, React.ComponentType> = {
  WeddingPackages,
  IndividualPackages,
  CouplePackages,
  MaternityPackages,
  CommercialPackages,
  EditorialPackages,
};

export function getServiceComponent(componentName: string): React.ComponentType | null {
  return SERVICE_COMPONENT_REGISTRY[componentName] || null;
}
