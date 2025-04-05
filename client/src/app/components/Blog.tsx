import Link from "next/link";


export default function Blog() {
    return (
        <div className="max-w-sm bg-blue-900 rounded-lg">
            <Link href="#">
                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
            </Link>
            <div className="p-5">
                <Link href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <Link href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                </Link>
            </div>
        </div>

    )
}
