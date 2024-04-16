import { Clip } from './Collection'

const ClipCard = ({clip}: {clip: Clip}) => {
  const createdAt = clip.createdAt.split(':')[0].slice(0, 10);
  const msecs = clip.end - clip.start;
  const secs = Math.floor(msecs/1000);
  const mins = Math.floor(secs/60);

  return (
    <div className="flex text-white text-body p-2 border-veryLightGray border-b-[1px] cursor-pointer gap-5">
      <p className="flex-1 text-nowrap overflow-x-hidden">{clip.title}</p>
      <span className="flex-1"><a className="text-white opacity-55 text-small hover:opacity-85 " href={`https://www.youtube.com/watch?v=${clip.videoId}`}>Source</a></span>
      <p className="flex-1 text-white opacity-55 text-small hidden lg:block">{createdAt}</p>
      <p className="flex-1 text-white opacity-55 text-small">
        {mins > 9 ? mins : "0" + mins}:
        {secs > 9 ? secs : "0" + secs}
      </p>
    </div>
  )
}

export default ClipCard