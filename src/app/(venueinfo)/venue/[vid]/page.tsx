import Image from "next/image"
import getVenue from "@/libs/getVenue"
export default async function VenueDetailPage({ params }: { params: { vid: string } }) {
    // Mock Data for Demonstration Only
    // const mockVenueRepo = new Map()
    // mockVenueRepo.set("001", { name: "The Bloom Pavilion", image: "/img/bloom.jpg" })
    // mockVenueRepo.set("002", { name: "Spark Space", image: "/img/sparkspace.jpg" })
    // mockVenueRepo.set("003", { name: "The Grand Table", image: "/img/grandtable.jpg" })
    const venueDetail = await getVenue(params.vid)
    return (
        <main className="text-center p-14">
            <h1 className="text-2xl font-medium">{venueDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={venueDetail.data.picture}
                    alt='Product Picture'
                    width={0} height={0} sizes="100vw"
                    className='rounded-lg w-[30%] bg-black' />
                <div className="text-md mx-5 text-left">Name: {venueDetail.data.name}
                    <div>Address: {venueDetail.data.address} </div>
                    <div>District: {venueDetail.data.district}</div>
                    <div>Province: {venueDetail.data.province}</div>
                    <div>Postal Code: {venueDetail.data.postalcode}</div>
                    <div>Tel: {venueDetail.data.tel}</div>
                    <div>Daily Rate: {venueDetail.data.dailyrate}</div>
                </div>
            </div>
        </main>
    )
}