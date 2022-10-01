import useFetch from "react-fetch-hook";
import { useEffect, useState } from "react";
import ContactCards from "./components/ContactCards";

function App() {
    const [contactList, setContactList] = useState(null);
    const [filterQuery, setFilterQuery] = useState(null);
    const { data } = useFetch(
        "https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json"
    );

    useEffect(() => {
        if (filterQuery) {
            const query = filterQuery.toLowerCase().replace(/\s/g, "");
            const filteredData = data.filter((contact) => {
                const fullName = `${contact.first_name}${contact.last_name}`;
                return fullName.toLowerCase().includes(query);
            });
            setContactList(filteredData);
        } else {
            if (data) {
                data.sort(function (a, b) {
                    if (a.last_name < b.last_name) {
                        return -1;
                    }
                    if (a.last_name > b.last_name) {
                        return 1;
                    }
                    return 0;
                });
                setContactList(data);
            }
        }
    }, [data, filterQuery]);

    return (
        <div className="bg-gray-200">
            <section>
                <form>
                    <input
                        type="text"
                        className="ml-20 mt-10 pl-10 rounded-md p-2 "
                        placeholder="Type here to search"
                        onChange={(e) => setFilterQuery(e.target.value)}
                    />
                </form>
            </section>
            <section className="p-20 grid md:grid-cols-2 gap-8">
                <ContactCards contactList={contactList} />
                {contactList?.length === 0 ? <div>No data found</div> : <></>}
            </section>
        </div>
    );
}

export default App;
