async function flags_link(flags) {
    let data = {"flags" : flags}
    let result = await postResult("/flags", csrf_field.value, data);
    if (result !== null && result.success) {
        window.location.href = result.url;
    }
}
