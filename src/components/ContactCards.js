import { useState } from "react";

const ContactCards = (contactList) => {
    const [checkedIds, setCheckedIds] = useState([]);

    const handleChange = (id) => {
        if (!checkedIds.includes(id)) {
            checkedIds.push(id);
        } else {
            const index = checkedIds.indexOf(id);
            if (index > -1) {
                checkedIds.splice(index, 1);
            }
        }
        setCheckedIds((checkedIds) => [...checkedIds]);
        console.log(checkedIds);
    };

    return (
        <>
            {contactList.contactList ? (
                contactList.contactList.map((data, index) => (
                    <div
                        className=" border-solid border-b border-r border-gray-500"
                        key={index}
                    >
                        <ul className="max-w-md divide-y dark:divide-gray-700">
                            <li className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            alt=""
                                            className="w-16 h-16 rounded-full mx-auto"
                                            src={data.avatar}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {data.first_name} {data.last_name}
                                        </p>
                                    </div>
                                    <div className="text-center pr-8">
                                        <label
                                            htmlFor={data.id}
                                            className="mr-2 text-sm font-medium text-gray-900"
                                        >
                                            Select:
                                        </label>
                                        <input
                                            id={data.id}
                                            type="checkbox"
                                            className="w-4 h-4 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                                            onChange={() =>
                                                handleChange(data.id)
                                            }
                                            checked={checkedIds.includes(
                                                data.id
                                            )}
                                        />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                ))
            ) : (
                <div> loading...</div>
            )}
        </>
    );
};

export default ContactCards;
