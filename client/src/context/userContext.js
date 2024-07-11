import React, { createContext, useState } from 'react';

// Create a UserContext with default values
export const UserContext = createContext({
    isLoginTrue: false,
    setIsLoginTrue: () => {},
    user: null,
    setUser: () => {}
});
