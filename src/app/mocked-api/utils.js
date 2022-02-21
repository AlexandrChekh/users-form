export const delay = (timeout) =>
    new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });

export const resolveAfterTimeout = (value, timeout) =>
    delay(timeout).then(() => value);

export const rejectAfterTimeout = (error, timeout) =>
    delay(timeout).then(() => {
        throw error;
    });
