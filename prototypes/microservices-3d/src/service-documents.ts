import { createModuleDocument } from '../../microservices-2.5d/src/module-details.ts';
import type { ServiceDocuments, ServiceId } from './contracts.ts';

export const SERVICE_IDS: readonly ServiceId[] = Object.freeze(['order', 'inventory', 'payment']);

/** The existing teaching definitions are shared; they are not a real deployment model. */
export function createServiceDocuments(): ServiceDocuments {
  return { order: createModuleDocument('order'), inventory: createModuleDocument('inventory'), payment: createModuleDocument('payment') };
}

export function serviceOfNode(id: string | null): ServiceId | null {
  const owner = id?.split('/')[0];
  return SERVICE_IDS.find(service => service === owner) ?? null;
}
