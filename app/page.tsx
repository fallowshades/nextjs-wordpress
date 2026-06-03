import getAllPosts from '@/lib/queries/getAllPosts'
import getPageBySlug from '@/lib/queries/getPageBySlug'
import {Post} from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'

/**
 * The homepage route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
// not word in static page { params }: { params: { slug: string } }

//static parts does not need a registry for component flow
export default async function Home() {
  // Fetch homepage from WordPress.
  const homepage = await getPageBySlug('homepage')

  // Fetch posts from WordPress.
  const posts = await getAllPosts()

  // No data? Bail...
  if (!posts?.length || !homepage) {
    notFound()
  }

  return (
    <main className="flex flex-col gap-8">
      <article>
        <h1 dangerouslySetInnerHTML={{__html: homepage.title ?? ''}} />
        <div dangerouslySetInnerHTML={{__html: homepage.content ?? ''}} />
      </article>

      <aside>
        <h2>Latest Posts</h2>
        <div className="flex flex-wrap gap-8">
          {posts.map((post: Post, index: number) => {
            // const definition = registry[params.slug]

            // if (!definition) {
            //   return <div key={1}>Component not found</div>
            // }

            return (
              <article className="w-72" key={post.databaseId}>
                {post.featuredImage?.node && (
                  <Image
                    alt={post.featuredImage.node.altText ?? post.title ?? ''}
                    height={post.featuredImage.node.mediaDetails?.height ?? 230}
                    src={post.featuredImage.node.sourceUrl ?? ''}
                    width={post.featuredImage.node.mediaDetails?.width ?? 288}
                    sizes="(max-width: 768px) 100vw, 288px"
                    className="h-auto w-full object-cover"
                    priority={index < 2}
                  />
                )}

                {/* {components.map((component) => (
                  <Card
                    key={component.slug}
                    to={`/components/${component.slug}`}
                    className="p-0"
                  >
                    <div className="flex flex-col">
                      <h3 className="text-primary-vivid group-hover:text-primary-accent border-primary-muted/20 truncate border-b p-4 font-mono text-xl font-medium">
                        {`<${component.name} />`}
                      </h3>

                      <div className="bg-app-muted/5 relative flex h-64 items-center justify-center overflow-hidden">
                        <div className="pointer-events-none scale-90 transform">
                          <component.component {...component.defaultProps} />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))} */}
                <Link href={`/blog/${post.slug}`}>
                  <h2 dangerouslySetInnerHTML={{__html: post.title ?? ''}} />
                </Link>
                <p className="text-sm text-gray-500">
                  {post.commentCount} Comments
                </p>
                <div dangerouslySetInnerHTML={{__html: post.excerpt ?? ''}} />
                <Link className="button" href={`/blog/${post.slug}`}>
                  View Post
                </Link>
              </article>
            )
          })}
        </div>
      </aside>
    </main>
  )
}
