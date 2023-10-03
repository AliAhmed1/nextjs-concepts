import MeetupDetails from '../../components/meetups/MeetupDetails'
import { MongoClient, ObjectId } from 'mongodb'

function MeetupDetailsPage(props) {

    const { meetupsDetails } = props;

    return (

        <MeetupDetails
            image={meetupsDetails.image}
            title={meetupsDetails.title}
            address={meetupsDetails.address}
            description={meetupsDetails.description}
        />
    )
}


export async function getStaticPaths() { // used for dynamics page end point only with get static props

    const client = new MongoClient('mongodb+srv://saliahmed:admin@cluster0.5ee5ilu.mongodb.net/?retryWrites=true&w=majority');

    await client.connect(); // Connect to the MongoDB server

    const db = client.db("meetups");
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();


    return {
        fallback: false, // means it support all paths
        paths: meetups.map((meetup) => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))



        // paths: [  // static
        //     { 
        //         params: {
        //             meetupId: '1'
        //         }
        //     },
        //     {
        //         params: {
        //             meetupId: '2'
        //         }
        //     }
        // ]
    }
}


export async function getStaticProps(context) {


    const meetupId = context.params.meetupId;  // use to get id or [] of the page in static props similar to useRouter
    console.log(meetupId) // static props executes during build so show in cli

    const client = new MongoClient('mongodb+srv://saliahmed:admin@cluster0.5ee5ilu.mongodb.net/?retryWrites=true&w=majority');

    await client.connect(); // Connect to the MongoDB server

    const db = client.db("meetups");
    const meetupsCollection = db.collection('meetups');
    const meetupData = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });


    return {
        props:
        {
            meetupsDetails: {
                image: meetupData.image,
                id: meetupData._id.toString(),
                title: meetupData.title,
                address: meetupData.address,
                description: meetupData.description,
            } // pre-render this data before page execution
        },
        revalidate: 10 // page regenerate by the server every 10 second if incoming request   
    }
}


export default MeetupDetailsPage;