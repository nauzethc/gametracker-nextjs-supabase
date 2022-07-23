import Image from 'next/image'

const DEFAULT_SIZE = [264, 374]

export default function Cover ({ src, alt = 'Cover', className = '' }) {
  return (
    <figure className={`overflow-hidden !block bg-base-300 ${className}`} style={{
      aspectRatio: DEFAULT_SIZE[0] / DEFAULT_SIZE[1],
      height: 'fit-content'
    }}>
      {src
        ? <Image
            layout="responsive"
            src={src} alt={alt}
            width={DEFAULT_SIZE[0]}
            height={DEFAULT_SIZE[1]} />
        : <div className=""
            style={{
              display: 'grid',
              placeContent: 'center',
              content: 'No cover',
              height: '100%',
              width: '100%'
            }}>No Cover</div>
      }
    </figure>
  )
}
