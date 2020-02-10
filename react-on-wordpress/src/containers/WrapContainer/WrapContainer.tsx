import * as React from 'react'

interface Props {
  wrapPrefix: string
}

export const WrapContainer: React.FunctionComponent<Props> = ({ wrapPrefix, children }) => (
  <div className={`${wrapPrefix}-1`}>
    <div className={`${wrapPrefix}-2`}>
      <div className={`${wrapPrefix}-3`}>{children}</div>
    </div>
  </div>
)
