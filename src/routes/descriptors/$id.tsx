import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/descriptors/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/descriptors/$id"!</div>
}
