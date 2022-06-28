
// Saves options to chrome.storage
function save_options() {
    var obsidianUriPatthern = document.getElementById('obsidian_uri_pattern').value;
    var obsidianNoteFormat = document.getElementById('obsidian_note_format').value;
    chrome.storage.local.set({
        obsidianUriPatthern: obsidianUriPatthern,
        obsidianNoteFormat: obsidianNoteFormat,
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
    chrome.storage.local.get({
        obsidianNoteFormat: `- #webclip {clip}
    - from [{title}]({url})`
    }, function(options) {
        document.getElementById('obsidian_note_format').value = options.obsidianNoteFormat;
    });
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
