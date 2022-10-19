// Working jank isn"t jank
(() => {
    // Crunchyroll seems to regenerate all of it"s elements inside <div id="content"> after the page has loaded, this is my solution.
    document.addEventListener("DOMNodeInserted", function (e) {
        if (e.relatedNode.className != "") { // The div inside the content div has no classes assigned to it.
            return;
        }
        var header_reloaded = false;
        for (let item of e.relatedNode.children) {
            if (item.className != "erc-header") { // If it doesn"t contain the header div then it hasn"t been regenerated yet.
                continue;
            }
            header_reloaded = true;
            break;
        }
        if (header_reloaded != true) { // Return if header hasn"t been regenerated
            return;
        }

        const user_actions_ul = document.querySelector("ul.erc-user-actions");
        if (!user_actions_ul) {
            console.log("[Improved Crunchyroll] No actions list found.");
            return;
        }

        var rndm_btn_li = document.createElement("li");
        rndm_btn_li.classList.add("user-actions-item");
        user_actions_ul.appendChild(rndm_btn_li);

        var rndm_btn_a = document.createElement("a");
        rndm_btn_a.className = "erc-header-tile state-icon-only erc-watchlist-header-button";
        rndm_btn_a.href = "https://www.crunchyroll.com/random/anime";
        //rndm_btn_a.text = "Random";
        rndm_btn_li.appendChild(rndm_btn_a);

        var rndm_btn_img = document.createElement("img");
        rndm_btn_img.width = "24";
        rndm_btn_img.src = chrome.runtime.getURL("images/random.svg");
        rndm_btn_a.appendChild(rndm_btn_img);

        // We don"t need this eventlistener if the elements have been regenerated
        document.removeEventListener("DOMNodeInserted", arguments.callee, false);
    });
})();