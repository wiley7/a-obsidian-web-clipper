
var defaultClippingOptions = {
    obsidianUriPatthern: "obsidian://advanced-uri?vault=notes&daily=true&mode=append&data={note}"
}
// Get vault & and if we clip as a new note:
chrome.storage.local.get(defaultClippingOptions, function(clippingOptions){

const obsidianUriPatthern = clippingOptions.obsidianUriPatthern;
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
    console.log("start")

    $("#confirm").click(function(){
        var result = $("#clipcontent").val()
        result = result.replace(/%/,"%25")
        var note = encodeURIComponent(result)

        var clipNoteUri = obsidianUriPatthern;
        clipNoteUri = clipNoteUri.replace(/{note}/g, note)
    
        // Create and remove the extra tab:
        chrome.tabs.create({ url: clipNoteUri });
    });

    $("#clipcontent").keydown(function (event) {
        if (event.keyCode == 13 && (event.metaKey || event.ctrlKey)) {
            $('#confirm').click();
        }
    });

    var tab = tabs[0];


    chrome.tabs.sendMessage(tab.id, {action:"getSelection"},function(resp) {
        console.log(resp)
        var title = tab.title.replace(/\//g, '')
        var url = tab.url
        var defaultNoteFormat = ` #webclip 
  > {clip}
  >	-- from [{title}]({url})`
        note = defaultNoteFormat
        var clip = resp.data.replace(/(\n[\s\t]*\r*\n)/g, '\n').replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '')
        note = note.replace(/{clip}/g, clip)
        note = note.replace(/\n/g, "\n  ")
        note = note.replace(/{url}/g, url)
        note = note.replace(/{title}/g, title)
        console.log("note:" + note)

        $("#clipcontent").val(note);
        $("#clipcontent").focus();
        $("#clipcontent")[0].setSelectionRange(0,0);

    });

    // var selection = tab[0].getSelection().toString();
    // console.log("selection:" + selection)
    // selection = selection.replace(/(\n[\s\t]*\r*\n)/g, '\n').replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '')

    // Replace the placeholders: (with regex so multiples are replaced as well..)
});

})
