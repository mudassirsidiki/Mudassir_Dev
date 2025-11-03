# Alternating Row Scroll Animation - Complete Implementation Reference

## ⚠️ IMPORTANT: Two Implementation Options

The original website uses **Locomotive Scroll** (smooth scrolling library). You have two options:

### Option 1: WITH Locomotive Scroll (Recommended - Matches Original Exactly)
This gives you smooth scrolling + the exact same animation behavior.

### Option 2: WITHOUT Locomotive Scroll (Simpler Setup)
Works perfectly but with regular browser scrolling.

---

## 📋 Dependencies Required

### For Option 1 (WITH Locomotive Scroll - Exact Match):

```html
<!-- Locomotive Scroll CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/locomotive-scroll@3.5.4/dist/locomotive-scroll.css">

<!-- GSAP Core Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
    integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<!-- GSAP ScrollTrigger Plugin (REQUIRED) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
    integrity="sha512-onMTRKJBKz8M1TnqqDuGBlowlH0ohFzMXYRNebz+yOcc5TQr/zAKsthzhuv0hiyUKEiQEQXEynnXCvNTOk50dg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<!-- Locomotive Scroll JS -->
<script src="https://cdn.jsdelivr.net/npm/locomotive-scroll@beta/bundled/locomotive-scroll.min.js"></script>
```

### For Option 2 (WITHOUT Locomotive Scroll - Simpler):

```html
<!-- GSAP Core Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
    integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<!-- GSAP ScrollTrigger Plugin (REQUIRED) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
    integrity="sha512-onMTRKJBKz8M1TnqqDuGBlowlH0ohFzMXYRNebz+yOcc5TQr/zAKsthzhuv0hiyUKEiQEQXEynnXCvNTOk50dg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

---

## 🎨 HTML Structure

```html
<div class="name w-full h-[70vh] lg:h-screen relative bg-[--Dark] overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <!-- Row 1: Moves RIGHT (has class "ls") -->
        <div class="row font-[Anton] ls -translate-x-1/2 w-full text-[30vw] lg:text-[10vw] py-2 flex gap-[2vw] text-white leading-none">
            <h1 class="bg-[--lime]">YOUR TEXT</h1>
            <h1 class="surname bg-[--lime] text-[--Dark]">YOUR TEXT</h1>
            <h1 class="bg-[--lime]">YOUR TEXT</h1>
            <h1 class="surname bg-[--lime] text-[--Dark]">YOUR TEXT</h1>
            <!-- Add more h1 elements as needed -->
        </div>

        <!-- Row 2: Moves LEFT (has class "rs") -->
        <div class="row font-[Anton] rs translate-x-1/3 w-full text-[30vw] lg:text-[10vw] flex gap-[4vw] text-white leading-none">
            <h1 class="surname-m text-transparent">YOUR TEXT</h1>
            <h1>YOUR TEXT</h1>
            <h1 class="surname-m text-transparent">YOUR TEXT</h1>
            <h1>YOUR TEXT</h1>
            <!-- Add more h1 elements as needed -->
        </div>

        <!-- Row 3: Moves RIGHT (has class "ls") -->
        <div class="row font-[Anton] ls -translate-x-2/4 w-full text-[30vw] lg:text-[10vw] py-5 flex gap-[4vw] text-white leading-none">
            <h1 class="bg-[--lime]">YOUR TEXT</h1>
            <h1 class="surname bg-[--lime] text-[--Dark]">YOUR TEXT</h1>
            <h1 class="bg-[--lime]">YOUR TEXT</h1>
            <h1 class="surname bg-[--lime] text-[--Dark]">YOUR TEXT</h1>
            <!-- Add more h1 elements as needed -->
        </div>
    </div>
</div>
```

### 🎯 Key Points:
- **`.name`** → Container class (used as trigger in JS)
- **`.ls`** → Rows that move RIGHT (alternating pattern)
- **`.rs`** → Rows that move LEFT (alternating pattern)
- Pattern: `ls` → `rs` → `ls` (you can add more rows following this pattern)

---

## ⚙️ JavaScript Code

### OPTION 1: WITH Locomotive Scroll (EXACT MATCH - Recommended)

**IMPORTANT:** Your HTML must have a `.main` container wrapping all content for this to work!

```html
<body>
    <div class="main w-full relative">
        <!-- All your content goes here -->
        <div class="name">...</div>
    </div>
    
    <!-- Scripts -->
</body>
```

```javascript
// Step 1: Initialize Locomotive Scroll + ScrollTrigger Setup
function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });

    // Sync ScrollTrigger with Locomotive Scroll
    locoScroll.on("scroll", ScrollTrigger.update);

    // CRITICAL: Tell ScrollTrigger to use Locomotive Scroll's scroll position
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length 
                ? locoScroll.scrollTo(value, 0, 0) 
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { 
                top: 0, 
                left: 0, 
                width: window.innerWidth, 
                height: window.innerHeight 
            };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // Refresh ScrollTrigger when window resizes
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // Initial refresh
    ScrollTrigger.refresh();
}

// Step 2: Initialize Locomotive Scroll FIRST
loco();

// Step 3: The Animation Function
function nameAnimation() {
    var t1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".name",           // Element that triggers the animation
            scroller: ".main",          // CRITICAL: Use .main as scroller
            start: "top bottom",        // Animation starts when top of .name hits bottom of viewport
            end: "bottom top",          // Animation ends when bottom of .name hits top of viewport
            scrub: 2                    // Smooth scrubbing (2 = slight delay, makes it smoother)
        },
    })

    // Left side rows (.ls) move RIGHT (30% of their width)
    t1.to(".ls", {
        xPercent: 30,                   // Moves 30% to the right
        duration: 7                     // Animation duration (relative to scroll distance)
    }, 'a')                             // 'a' label syncs animations together

    // Right side rows (.rs) move LEFT (30% of their width)
    t1.to(".rs", {
        xPercent: -30,                  // Moves 30% to the left (negative = left direction)
        duration: 7                     // Animation duration (relative to scroll distance)
    }, 'a')                             // 'a' label syncs animations together
}

// Step 4: Call the function to activate the animation
nameAnimation();
```

### OPTION 2: WITHOUT Locomotive Scroll (Simpler - Works Great)

```javascript
// Register ScrollTrigger plugin (do this once in your script)
gsap.registerPlugin(ScrollTrigger);

// The Animation Function
function nameAnimation() {
    var t1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".name",           // Element that triggers the animation
            start: "top bottom",        // Animation starts when top of .name hits bottom of viewport
            end: "bottom top",          // Animation ends when bottom of .name hits top of viewport
            scrub: 2                    // Smooth scrubbing (2 = slight delay, makes it smoother)
        },
    })

    // Left side rows (.ls) move RIGHT (30% of their width)
    t1.to(".ls", {
        xPercent: 30,                   // Moves 30% to the right
        duration: 7                     // Animation duration (relative to scroll distance)
    }, 'a')                             // 'a' label syncs animations together

    // Right side rows (.rs) move LEFT (30% of their width)
    t1.to(".rs", {
        xPercent: -30,                  // Moves 30% to the left (negative = left direction)
        duration: 7                     // Animation duration (relative to scroll distance)
    }, 'a')                             // 'a' label syncs animations together
}

// Call the function to activate the animation
nameAnimation();
```

### 🔑 Key Differences:
- **Option 1**: Requires `.main` wrapper, has smooth scrolling, matches original exactly
- **Option 2**: No wrapper needed, regular scrolling, simpler setup

---

## 🎛️ Customization Options

### Change Movement Distance:
```javascript
xPercent: 30   // Change this value (30 = 30% movement)
xPercent: 50   // More movement
xPercent: 20   // Less movement
```

### Change Animation Speed:
```javascript
duration: 7    // Higher = slower animation (takes more scroll distance)
duration: 3    // Lower = faster animation (takes less scroll distance)
```

### Change Scroll Trigger Points:
```javascript
start: "top bottom"    // When top of element hits bottom of viewport
start: "top center"    // When top of element hits center of viewport
start: "top top"       // When top of element hits top of viewport

end: "bottom top"      // When bottom of element hits top of viewport
end: "bottom center"   // When bottom of element hits center of viewport
```

### Change Scrub Smoothness:
```javascript
scrub: 1       // Tighter, more responsive
scrub: 2       // Default, smoother
scrub: 3       // Very smooth, more lag
scrub: true    // Direct scrubbing (no delay)
```

---

## 🚀 Step-by-Step Implementation

### Step 1: Add Dependencies
Add GSAP and ScrollTrigger CDN links before your closing `</body>` tag or in `<head>`.

### Step 2: Create HTML Structure
Add the HTML structure with:
- A container with class `name`
- Rows with alternating classes `ls` and `rs`
- Your content inside each row

### Step 3: Add JavaScript
Add this JavaScript code (after GSAP scripts load):

```javascript
gsap.registerPlugin(ScrollTrigger);

function nameAnimation() {
    var t1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".name",
            start: "top bottom",
            end: "bottom top",
            scrub: 2
        },
    })

    t1.to(".ls", {
        xPercent: 30,
        duration: 7
    }, 'a')
    
    t1.to(".rs", {
        xPercent: -30,
        duration: 7
    }, 'a')
}

nameAnimation();
```

### Step 4: Test
Scroll through your page and watch the rows move in alternating directions!

---

## 💡 Tips & Notes

1. **Multiple Sections**: If you want this effect on multiple sections, change the trigger class and create separate functions:
   ```javascript
   function section1Animation() {
       // Change trigger: ".name" to ".section1"
       // Keep same logic
   }
   ```

2. **CSS Classes**: The `ls` and `rs` classes are just identifiers. You can rename them to anything you want (like `.move-right` and `.move-left`), just update the JavaScript accordingly.

3. **Responsive Design**: The `xPercent` property uses percentage-based movement, so it automatically scales with screen size. Perfect for responsive designs!

4. **Performance**: The `scrub` parameter smooths the animation. Higher values = smoother but more laggy, lower values = more responsive but less smooth.

5. **Testing**: You can uncomment `markers: true` in ScrollTrigger to see visual indicators of when the animation starts/ends:
   ```javascript
   scrollTrigger: {
       trigger: ".name",
       start: "top bottom",
       end: "bottom top",
       markers: true,  // Shows start/end points
       scrub: 2
   }
   ```

---

## 📚 GSAP Documentation References

- **ScrollTrigger**: https://greensock.com/docs/v3/Plugins/ScrollTrigger
- **GSAP Timeline**: https://greensock.com/docs/v3/GSAP/Timeline
- **xPercent**: https://greensock.com/docs/v3/GSAP/GSAP/UtilityMethods/quickSetter()

---

## ✅ Complete Working Examples

### Example 1: WITH Locomotive Scroll (Exact Match)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scroll Animation</title>
    <!-- Locomotive Scroll CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/locomotive-scroll@3.5.4/dist/locomotive-scroll.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background: #121212;
            overflow-x: hidden;
        }
        .main {
            width: 100%;
            position: relative;
        }
        .name {
            width: 100%;
            height: 100vh;
            position: relative;
            background: #1a1a1a;
            overflow: hidden;
        }
        .row {
            display: flex;
            gap: 2vw;
            white-space: nowrap;
        }
        .row h1 {
            font-size: 10vw;
            font-weight: bold;
            color: white;
        }
    </style>
</head>
<body>
    <!-- CRITICAL: Wrap everything in .main for Locomotive Scroll -->
    <div class="main">
        <!-- Add some spacer content above -->
        <div style="height: 50vh; background: #121212;"></div>
        
        <div class="name">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%;">
                <!-- Row 1: Moves RIGHT -->
                <div class="row ls" style="transform: translateX(-50%);">
                    <h1>YOUR</h1>
                    <h1>TEXT</h1>
                    <h1>HERE</h1>
                    <h1>YOUR</h1>
                    <h1>TEXT</h1>
                    <h1>HERE</h1>
                </div>
                
                <!-- Row 2: Moves LEFT -->
                <div class="row rs" style="transform: translateX(33.33%);">
                    <h1>YOUR</h1>
                    <h1>TEXT</h1>
                    <h1>HERE</h1>
                    <h1>YOUR</h1>
                    <h1>TEXT</h1>
                    <h1>HERE</h1>
                </div>
                
                <!-- Row 3: Moves RIGHT -->
                <div class="row ls" style="transform: translateX(-50%); padding-top: 5vw;">
                    <h1>YOUR</h1>
                    <h1>TEXT</h1>
                    <h1>HERE</h1>
                    <h1>YOUR</h1>
                    <h1>TEXT</h1>
                    <h1>HERE</h1>
                </div>
            </div>
        </div>
        
        <!-- Add some spacer content below -->
        <div style="height: 50vh; background: #121212;"></div>
    </div>

    <!-- GSAP Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    <!-- Locomotive Scroll -->
    <script src="https://cdn.jsdelivr.net/npm/locomotive-scroll@beta/bundled/locomotive-scroll.min.js"></script>

    <!-- Your Animation Script -->
    <script>
        // STEP 1: Initialize Locomotive Scroll
        function loco() {
            gsap.registerPlugin(ScrollTrigger);

            const locoScroll = new LocomotiveScroll({
                el: document.querySelector(".main"),
                smooth: true
            });

            locoScroll.on("scroll", ScrollTrigger.update);

            ScrollTrigger.scrollerProxy(".main", {
                scrollTop(value) {
                    return arguments.length 
                        ? locoScroll.scrollTo(value, 0, 0) 
                        : locoScroll.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                    return { 
                        top: 0, 
                        left: 0, 
                        width: window.innerWidth, 
                        height: window.innerHeight 
                    };
                },
                pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
            });

            ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
            ScrollTrigger.refresh();
        }

        loco();

        // STEP 2: Animation Function
        function nameAnimation() {
            var t1 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".name",
                    scroller: ".main",  // CRITICAL: Use .main as scroller
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2
                },
            })

            t1.to(".ls", {
                xPercent: 30,
                duration: 7
            }, 'a')

            t1.to(".rs", {
                xPercent: -30,
                duration: 7
            }, 'a')
        }

        nameAnimation();
    </script>
</body>
</html>
```

### Example 2: WITHOUT Locomotive Scroll (Simpler)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scroll Animation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            height: 300vh;
            background: #121212;
        }
        .name {
            width: 100%;
            height: 100vh;
            position: relative;
            background: #1a1a1a;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .row {
            display: flex;
            gap: 2vw;
            white-space: nowrap;
        }
        .row h1 {
            font-size: 10vw;
            font-weight: bold;
            color: white;
        }
    </style>
</head>
<body>
    <div class="name">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
            <!-- Row 1: Moves RIGHT -->
            <div class="row ls">
                <h1>YOUR</h1>
                <h1>TEXT</h1>
                <h1>HERE</h1>
                <h1>YOUR</h1>
                <h1>TEXT</h1>
                <h1>HERE</h1>
            </div>
            
            <!-- Row 2: Moves LEFT -->
            <div class="row rs">
                <h1>YOUR</h1>
                <h1>TEXT</h1>
                <h1>HERE</h1>
                <h1>YOUR</h1>
                <h1>TEXT</h1>
                <h1>HERE</h1>
            </div>
            
            <!-- Row 3: Moves RIGHT -->
            <div class="row ls">
                <h1>YOUR</h1>
                <h1>TEXT</h1>
                <h1>HERE</h1>
                <h1>YOUR</h1>
                <h1>TEXT</h1>
                <h1>HERE</h1>
            </div>
        </div>
    </div>

    <!-- GSAP Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

    <!-- Your Animation Script -->
    <script>
        gsap.registerPlugin(ScrollTrigger);

        function nameAnimation() {
            var t1 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".name",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2
                },
            })

            t1.to(".ls", {
                xPercent: 30,
                duration: 7
            }, 'a')

            t1.to(".rs", {
                xPercent: -30,
                duration: 7
            }, 'a')
        }

        nameAnimation();
    </script>
</body>
</html>
```

---

**🎯 For exact match with original website, use Example 1 (WITH Locomotive Scroll).** 🎉

