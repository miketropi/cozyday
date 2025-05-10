import LogoDevfun from '../assets/ece2084a-3ce3-40dc-b573-b9cb08330724.jpg'

export default function Logo() {
  return (
    <div className='absolute top-2 left-2 flex items-center gap-2 z-10'>
      <img src={LogoDevfun} alt="Logo" className='w-10 h-10 rounded-full border-2 border-white' />
      <div className='text-sm font-bold uppercase text-black'>Devfun</div>
    </div>
  )
}