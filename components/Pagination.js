import Link from 'next/link'

export default function Pagination({ currentPage, numPages }) {

  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = `/blog/page/${currentPage - 1}`
  const nextPage = `/blog/page/${currentPage + 1}`

  if (numPages === 1) return <></>

  return (
      <div className="mt-6">
          <ul className="flex pl-0 list-none my-2">
              {!isFirst && (
                  <Link href={prevPage} passHref>
                      <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer dark:text-white dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-900">
                          Previous
                      </li>
                  </Link>
              )}
              {Array.from({ length: numPages }, (_, i) => (
                  <Link href={`/blog/page/${i + 1}`} key={`page-${i}`} passHref>
                      <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer dark:text-white dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-900">
                          {i + 1}
                      </li>
                  </Link>
              ))}

              {!isLast && (
                  <Link href={nextPage} passHref>
                      <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer dark:text-white dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-900">
                          Next
                      </li>
                  </Link>
              )}
          </ul>
      </div>
  );
}