import { Link } from 'react-router-dom'
import logoUrl from '/logo_transparent-cut.png'

export function AsideHeader() {
  return (
    <Link to={'/'}>
      <div className="aside-header">
        <img src={logoUrl} alt="flowing" className="aside-header-logo" />
        <h3>Flowing</h3>
      </div>
    </Link>
  )
}
