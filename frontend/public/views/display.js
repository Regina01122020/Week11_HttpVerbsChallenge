const url = 'http://localhost:3000' 

axios.get('http://localhost:3000/')
    .then(function(res) {
        console.log(res.data)
    })
    .catch(function(err) {
        console.log(err)
    })

const Records = function() {

    axios.get(`${url}/pet`)
        .then(function(res) {
            console.log(res.data)
            const attachRecords = document.querySelector('#petForm-section')
            console.log(attachRecords)
            attachRecords.innerHTML = ""

            const pets = res.data
            pets.forEach(function(pet) {
                const newDiv = document.createElement('div')
                newDiv.innerHTML = myPet(pet)

                attachRecords.append(newDiv)

                const deleteButton = document.querySelector(`#delete-x-${pet._id}`)
                deleteButton.addEventListener('click', function(event) {
                    console.log("DELETE BUTTON CLICKED")
                    console.log(event.target.id)
                    const petId = event.target.id.split("-")
                    console.log(petId)
                    deleteForm(petId[2]) 
                })

                const inputReason = document.querySelector(`#reason-edit-${pet._id}`)
                const updateButton = document.querySelector(`#update-button-${pet._id}`)
                const inputField = document.querySelector(`#input-field-${pet._id}`)

                updateButton.addEventListener('click', function(event) {
                    console.log("UPDATE BUTTON CLICKED")
                    console.log(inputField.value)
                    axios.patch(`${url}/pet/${pet._id}`, { reason_for_pet_name: inputField.value })
                        .then(function(pet) {
                            console.log(pet)
                            Records()
                        })
                        .catch(function(err) {
                            console.log(err)
                        })
                    
                    inputReason.classList.add('vanish')
                })

                console.log(deleteButton)
            })
        })
        .catch(function(err) {
            console.log(err)
        })

}

// This is the function used to handle the form submission
function submitForm(event) {
    event.preventDefault()
    console.log(event.target)
    alert("Form Submitted")
    console.log("Submitting the pet details form")
    const formData = new FormData(petForm)
    const plainFormData = Object.fromEntries(formData.entries())
    console.log("DISPLAYING THE FORM DATA")
    console.log(plainFormData)

    // Now we have to post the data to our API. 
    axios.post('http://localhost:3000/pet', plainFormData)
        .then(function (petAdded) {
            console.log("New pet details added") 
            Records()
        })
        .then(function(err) {
            console.log(err)
        }) 
}

const petForm = document.querySelector('#myForm')
petForm.addEventListener('submit', submitForm)


const deleteForm = function(petId) {

    axios.delete(`${url}/pet/${petId}`)
        .then(function(pet) {
            console.log("ITEM DELETED")
            console.log(pet)
            Records()
        })
        .catch(function(err) {
            console.log("ITEM NOT DELETED")
            console.log(err)
        })
}

const myPet = function(petData) {
    const newHTML = `
        <div id="h">
            <p><img src="${petData.picture}" length= "100" width="400"></p>
            <p> ${petData.reason_for_pet_name} </p> 
            
            <form id="show">
            <fieldset>
                <h5>Edit the reason for your pet name here...</h5>
                <div class="edit-input vanish" id="reason-edit-${petData._id}">
                    <textarea name="reason_for_pet_name" id="input-field-${petData._id}" rows="2"></textarea> 
                </div>
                <h6 id="update-button-${petData._id}"> UPDATE </h6>
                <h6 id="delete-x-${petData._id}"> DELETE </h6>
            </fieldset>
            </form>
        </div> 
       
    `
    return newHTML
}

Records() 