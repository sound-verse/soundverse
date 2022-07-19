import Header from '../components/Header'
import cn from 'classnames'

export default function Layout({ className = '', children }) {
  return (
    <>
      <Header />
      <div
        className={cn(
          'mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl',
          className
        )}
      >
        <div className="p-10">{children}</div>
      </div>
    </>
  )
}
