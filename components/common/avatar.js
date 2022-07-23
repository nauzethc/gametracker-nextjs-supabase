import Image from 'next/image'

export default function Avatar ({ url, alt = 'Profile', className = '' }) {
  return (
    <div className="avatar">
      <div className={`w-24 bg-base-300 rounded-full ${className}`}>
        {url
          ? <Image src={url} alt={alt} width={300} height={300} />
          : <svg className="h-full w-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
        }
      </div>
    </div>
  )
}
