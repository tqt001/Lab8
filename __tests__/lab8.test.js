describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    let entry = await page.$$('journal-entry');
    await entry[0].click();
    await page.waitForNavigation();
    expect(page.url()).toContain("#entry1");
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    let header = await page.evaluate(() => {
      return document.querySelector('header > h1').innerHTML;
    });
    expect(header).toContain('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    let result = await page.evaluate(() => {
      return document.querySelector('entry-page').entry;
    });
    expect(result.title).toBe("You like jazz?");
    expect(result.date).toBe("4/25/2021");
    expect(result.content).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
    expect(result.image['src']).toBe("https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455")
    expect(result.image['alt']).toBe('bee with sunglasses');
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    let element = await page.evaluate(() => {
      return document.body.className;
    });
    expect(element).toContain("single-entry");
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click("header > img");
    expect(page.url()).toContain("#settings");
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    await page.click("header > img");
    let header = await page.evaluate(() => {
      return document.querySelector('header > h1').innerHTML;
    });
    expect(header).toBe("Settings");
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    let element = await page.evaluate(() => {
      return document.body.className;
    });
    expect(element).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toContain("#entry1");
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it("Test 11: Click go back and check url", async() => {
    await page.goBack();
    expect(page.url()).toBe("http://127.0.0.1:5500/");
  });
  
  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it("Test 12: Click header at the top to return to home page and verify url", async() => {
    let title = await page.evaluate(() => {
      return document.querySelector('header > h1').innerHTML;
    });
    expect(title).toBe("Journal Entries");
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it("Test 13: Homepage <body> elements should not change", async() => {
    let element = await page.evaluate(() => {
      return document.body.className;
    });
  });
  

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it("Test 14: Click on second entry and check url", async () => {
    let entrys = await page.$$('journal-entry');
    await entrys[1].click();
    await page.waitForNavigation();
    expect(page.url()).toContain("#entry2");
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it("Test 15: Click title and make sure it is current", async() => {
    let title = await page.evaluate(() => {
      return document.querySelector("header > h1").innerHTML;
    });
    expect(title).toContain("Entry 2");
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it("Test 16: Verfiy contents of entry2", async() => {
    let result = await page.evaluate(() => {
      return document.querySelector('entry-page').entry;
    });
    expect(result.title).toBe("Run, Forrest! Run!");
    expect(result.date).toBe("4/26/2021");
    expect(result.content).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
    expect(result.image['src']).toBe("https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg")
    expect(result.image['alt']).toBe('forrest running');
  }, 10000);

  // create your own test 17
  it("Test 17: Click go back and verify url that it is homepage", async() => {
    await page.goBack();
    expect(page.url()).toBe("http://127.0.0.1:5500/");
  });
  // create your own test 18
  it("Test 18: Click on shrek and make sure it goes to shrek", async() => {
    let entrys = await page.$$('journal-entry');
    await entrys[2].click();
    await page.waitForNavigation();
    expect(page.url()).toContain("#entry3");
  });
  // create your own test 19
  it("Test 19: Verify date of entry after clicking on shrek", async() => {
    let result = await page.evaluate(() => {
      return document.querySelector('entry-page').entry;
    });
    expect(result.date).toBe("4/27/2021");
  });
  // create your own test 20
  it("Test 20: Verify title of entry after clicking on shrek", async() => {
    let result = await page.evaluate(() => {
      return document.querySelector('entry-page').entry;
    });
    expect(result.title).toBe("Ogres are like onions");
  });
});