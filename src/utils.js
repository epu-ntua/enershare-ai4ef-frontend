export function transformToHumanReadable(input) {
    // Use regex to replace underscores with spaces and capitalize each word
    return input.replace(/_([a-z])/g, function (match, group) {
        return ' ' + group.toUpperCase();
    }).replace(/(?:^|\s)\S/g, function (match) {
        return match.toUpperCase();
    });
}