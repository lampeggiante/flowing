import { baseUrl } from '@/pages/routes'
import { Link } from 'react-router-dom'

export function AsideHeader() {
  return (
    <Link to={`${baseUrl}\\`}>
      <div className="aside-header">
        <img
          src="/flowing/assets/logo_transparent-cut.png"
          alt="flowing"
          className="aside-header-logo"
        />
        <h3>Flowing</h3>
      </div>
    </Link>
  )
}
