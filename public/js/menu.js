$(document).ready(function () {
    const pathNames = trimWord(window.location.pathname, '/').split('/');
    console.log(pathNames)
    for(const path of pathNames) {
        if (path == '') {
            $('#dashboard').parent().addClass('active');
        } else {
            $('#' + path).parent().addClass('active');
        }
    }

    function hasSubstringAt(str, substr, pos) {
        var idx = 0, len = substr.length;

        for (var max = str.length; idx < len; ++idx) {
            if ((pos + idx) >= max || str[pos + idx] != substr[idx])
                break;
        }

        return idx === len;
    }

    function trimWord(str, word) {
        var start = 0,
            end = str.length,
            len = word.length;

        while (start < end && hasSubstringAt(str, word, start))
            start += word.length;

        while (end > start && hasSubstringAt(str, word, end - len))
            end -= word.length

        return (start > 0 || end < str.length) ? str.substring(start, end) : str;
    }
});