import React from 'react'
import StoryForm from "../components/StoryForm/StoryForm";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

function CreateStoryPage() {
    return (
        <div><Header/>
            <StoryForm />
            <Footer />
        </div>
    )
}

export default CreateStoryPage
