import Image from "next/image"

export function LogosHeader() {
  return (
    <div className="absolute top-8 right-8 z-40">
      <div className="flex items-center gap-4">
        <Image
          src="/images/startsmart-logo.png"
          alt="StartSmart Competition"
          width={120}
          height={60}
          className="object-contain"
        />
        <Image src="/images/garage-logo.png" alt="The Garage" width={80} height={60} className="object-contain" />
        <Image src="/images/flat6labs-logo.png" alt="Flat6Labs" width={140} height={40} className="object-contain" />
      </div>
    </div>
  )
}
