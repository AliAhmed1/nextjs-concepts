import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

function NewMeetupPage() {
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',  // Corrected the method as a string
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);

        router.push('/');
    }
    return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetupPage;