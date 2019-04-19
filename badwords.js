
function get(name)
{
	if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
	{
		return decodeURIComponent(name[1]);
	}
}

function load()
{
	var input = get("input").toLowerCase();
	var type = get("type").toLowerCase();
	
	var doc;
	switch(type)
	{
		default:
		case "single":
			for (var i = 0; i < swears.length; i++)
			{
				if (swears[i].word == input)
				{
					doc = JSON.stringify(swears[i]);
					break;
				}
			}
			break;

		case "scan":
			break;

		case "filter":
			var show = [];
			var tags = input.split(" ");
			for (var i = 0; i < swears.length; i++)
			{
				for (var j = 0; j < tags.length; j++)
				{
					if (swears[i].tags.includes(tags[j]))
					{
						show.push(swears[i]);
					}
				}
			}
			doc = JSON.stringify(show);
			break;
	}

	document.documentElement.innerHTML = doc;
}

function badword(tier, word, tags)
{
	this.tier = tier;
	this.word = word;
	this.tags = tags.split(" ");
}

var swears = [];

function add(tier, word, tags)
{
	var swear = new badword(tier, word, tags);
	swears.push(swear);
}

window.onload = load;

// stuff that can always be said
add(0, "heck", "inoffensive");
add(0, "darn", "inoffensive");
add(0, "hell", "inoffensive religious");
add(0, "damn", "inoffensive religious");
add(0, "crap", "inoffensive bodily-fluid");

// stuff that can be said in a non-swear way
add(1, "ass", "inoffensive sexual contextually-sexual body-part");
add(1, "gay", "discriminatory sexuality");
add(1, "penis", "sexual body-part");
add(1, "vagina", "sexual body-part");
add(1, "bitch", "female sexual contextually-sexual");
add(1, "knob", "sexual british body-part");

// stuff that will always be swears
add(2, "shit", "preschool bodily-fluid");
add(2, "fuck", "sexual contextually-sexual");
add(2, "asshole", "sexual body-part");
add(2, "nigga", "endearing racial black");
add(2, "queer", "discriminatory sexuality");
add(2, "cum", "sexual bodily-fluid");

// stuff that is considered taboo
add(3, "nigger", "discriminatory racial black");
add(3, "faggot", "discriminatory sexuality");
add(3, "cunt", "endearing sexual british");

