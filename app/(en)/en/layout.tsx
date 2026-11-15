import RootDocument from '@/app/_shell/RootDocument';
import { buildMetadata } from '@/app/_shell/metadata';
import type { ChildrenProps } from '@/src/types';

export const metadata = buildMetadata('en');

export default function Layout({ children }: ChildrenProps) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
