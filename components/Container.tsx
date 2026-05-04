import type { PropsWithChildren } from 'react'
import Divider from './Divider'

interface ContainerProps {
  withDivider?: boolean
}

export default function Container({ withDivider, children }: PropsWithChildren<ContainerProps>) {
  return (
    <div className="relative">
      {withDivider && <Divider />}

      <div className="flex w-full justify-center py-16 px-6 bg-surface">
        <div className="w-full max-w-7xl">{children}</div>
      </div>
    </div>
  )
}
