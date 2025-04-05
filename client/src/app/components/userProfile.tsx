export default function UserProfile({ imageSrc }: { imageSrc: string }) {
    return <div className="flex items-center gap-4">
        <img className="w-10 h-10 rounded-full" src={imageSrc} alt="" />
        <div className="font-medium dark:text-white">
            <div>Jese Leos</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
        </div>
    </div>
}