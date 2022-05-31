import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'


function Home() {
    return (
        <>
            <section className='heading'>
                <h1>
                    What do you need Help with?
                </h1>
                <p1>
                    Please choose from the option below
                </p1>
            </section>

            <Link to='/new-ticket' className='btn btn-reverse' >
                <FaQuestionCircle /> Create New Ticket
            </Link>
            <Link to='/tickets' className='btn btn-block' >
                <FaTicketAlt /> View my Tickets
            </Link>
        </>
    )
}

export default Home