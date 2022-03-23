
// Saves options to chrome.storage
function save_options() {
    var obsidianUriPatthern = document.getElementById('obsidian_uri_pattern').value;

    chrome.storage.local.set({
        obsidianUriPatthern: obsidianUriPatthern,
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.local.get({
        obsidianUriPatthern: 'obsidian://advanced-uri?vault=notes&daily=true&mode=append&data={note}'
    }, function(options) {
        document.getElementById('obsidian_uri_pattern').value = options.obsidianUriPatthern;
    });
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
