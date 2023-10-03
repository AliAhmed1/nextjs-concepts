import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb'
import Head from 'next/head';

// const DUMMY_MEETUPS = [
//     {
//         id: '1',
//         title: 'title 1',
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9hxIGIRPVvvpnSQjDGNI0undzKEHbVYvWe-7bvt9W4A&s',
//         address: 'address 1',
//         description: 'description 1',

//     },

//     {
//         id: '2',
//         title: 'title 2',
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9hxIGIRPVvvpnSQjDGNI0undzKEHbVYvWe-7bvt9W4A&s',
//         address: 'address 2',
//         description: 'description 2',

//     }

// ]



function Homepage(props) {    // get data in props
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="Meetups" description="this is a React Meetups" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>             // get data from static props for pre-rendering the page

    )
}


// export async function getServerSideProps(context) { //only runs on server side
//     const req = context.req;
//     const res = context.res;

//     return {
//         props:
//         {
//             meetups: DUMMY_MEETUPS // runs after every incoming request or change
//         }
//     }
// }



export async function getStaticProps() { // generate data at a build time It fetches the data and generates the HTML pages on our server and it caches it

    const client = new MongoClient('mongodb+srv://saliahmed:admin@cluster0.5ee5ilu.mongodb.net/?retryWrites=true&w=majority');

    await client.connect(); // Connect to the MongoDB server

    const db = client.db("meetups");
    const meetupsCollection = db.collection('meetups');

    const meetupData = await meetupsCollection.find().toArray();

    return {
        props:
        {
            meetups: meetupData.map(meetup => ({
                title: meetup.title,
                description: meetup.description,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))         // pre-render this data before page execution
        },
        revalidate: 10 // page regenerate by the server every 10 second if incoming request change  
    }
}

export default Homepage;