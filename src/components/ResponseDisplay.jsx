import React from 'react';

const ResponseDisplay = ({ response }) => (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Response</h2>
        <pre className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
    </div>
);

export default ResponseDisplay;
