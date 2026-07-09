import { SectionShell } from './section-shell'
import { normalizeStrapiMediaUrl } from '#/lib/strapi/client'

export function AboutHistorySection({ data }: { data?: any }) {
  const title = data?.historyTitle || 'Sejarah Kami'
  const content1 = data?.historyContent1 || ''
  const content2 = data?.historyContent2 || ''
  
  const imageUrl1 = normalizeStrapiMediaUrl(data?.historyImage1?.url)
  const imageUrl2 = normalizeStrapiMediaUrl(data?.historyImage2?.url)
  const imageUrl3 = normalizeStrapiMediaUrl(data?.historyImage3?.url)

  return (
    <SectionShell tone="white">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5 flex flex-col">
          <h2
            className="text-5xl font-medium tracking-tight text-garda-forest lg:text-7xl"
            dangerouslySetInnerHTML={{
              __html: title.split(' ').join('<br class="hidden lg:block" /> '),
            }}
          />
          <div className="mt-8 lg:mt-20 space-y-6 text-xl leading-relaxed text-garda-ink-soft whitespace-pre-wrap">
            {content2}
          </div>
        </div>
        
        <div className="lg:col-span-7 lg:pl-8">
          <div className="text-xl leading-relaxed text-garda-ink-soft">
            {imageUrl1 && (
              <img
                src={imageUrl1}
                alt=""
                className="float-left w-1/3 mr-6 mb-4 object-cover"
              />
            )}
            <div className="whitespace-pre-wrap">{content1}</div>
          </div>
          
          <div className="relative aspect-square sm:aspect-[4/3] w-full mt-16 sm:mt-24">
            {imageUrl2 ? (
              <img
                src={imageUrl2}
                alt=""
                className="absolute left-0 top-0 w-[60%] h-[75%] object-cover rounded-t-[2.5rem] rounded-bl-[2.5rem] rounded-br-xl shadow-sm"
              />
            ) : (
              <div className="absolute left-0 top-0 w-[60%] h-[75%] rounded-t-[2.5rem] rounded-bl-[2.5rem] rounded-br-xl bg-garda-paper/50" />
            )}
            
            {imageUrl3 ? (
              <img
                src={imageUrl3}
                alt=""
                className="absolute right-0 bottom-0 w-[60%] h-[70%] object-cover border-8 border-white shadow-lg z-10"
              />
            ) : (
              <div className="absolute right-0 bottom-0 w-[60%] h-[70%] border-8 border-white bg-garda-paper/50 shadow-lg z-10" />
            )}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
