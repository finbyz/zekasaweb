/* Mega MEnu  Nav */

function zekasaNavDropdowns(e) {
    var t = this;
    this.container = document.querySelector(e),
        this.root = this.container.querySelector(".navRoot"),
        this.primaryNav = this.root.querySelector(".navSection.primary"),
        this.primaryNavItem = this.root.querySelector(".navSection.primary .rootLink:last-child"),
        this.secondaryNavItem = this.root.querySelector(".navSection.secondary .rootLink:first-child"),
        this.checkCollision(),
        window.addEventListener("load", this.checkCollision.bind(this)),
        window.addEventListener("resize", this.checkCollision.bind(this)),
        this.container.classList.add("noDropdownTransition"),
        this.dropdownBackground = this.container.querySelector(".dropdownBackground"),
        this.dropdownBackgroundAlt = this.container.querySelector(".alternateBackground"),
        this.dropdownContainer = this.container.querySelector(".dropdownContainer"),
        this.dropdownArrow = this.container.querySelector(".dropdownArrow"),
        this.dropdownRoots = Strut.queryArray(".hasDropdown", this.root),
        this.dropdownSections = Strut.queryArray(".dropdownSection", this.container).map(function(e) {
            return {
                el: e,
                name: e.getAttribute("data-dropdown"),
                content: e.querySelector(".dropdownContent")
            }
        });
    var n = window.PointerEvent ? {
        end: "pointerup",
        enter: "pointerenter",
        leave: "pointerleave"
    } : {
        end: "touchend",
        enter: "mouseenter",
        leave: "mouseleave"
    };
    this.dropdownRoots.forEach(function(e, r) {
        e.addEventListener(n.end, function(n) {
            n.preventDefault(), n.stopPropagation(), t.toggleDropdown(e)
        }), e.addEventListener(n.enter, function(n) {
            if (n.pointerType == "touch") return;
            t.stopCloseTimeout(), t.openDropdown(e)
        }), e.addEventListener(n.leave, function(e) {
            if (e.pointerType == "touch") return;
            t.startCloseTimeout()
        })
    }), this.dropdownContainer.addEventListener(n.end, function(e) {
        e.stopPropagation()
    }), this.dropdownContainer.addEventListener(n.enter, function(e) {
        if (e.pointerType == "touch") return;
        t.stopCloseTimeout()
    }), this.dropdownContainer.addEventListener(n.leave, function(e) {
        if (e.pointerType == "touch") return;
        t.startCloseTimeout()
    }), document.body.addEventListener(n.end, function(e) {
        t.closeDropdown()
    })
}
/* end zekasanavDropdown */

/* Starting code */
var Strut = {
    queryArray: function(e, t) {
        // console.log(e,t);
        return t || (t = document.body), Array.prototype.slice.call(t.querySelectorAll(e))
    },
    ready: function(e) {
        // console.log(e);
        document.addEventListener("DOMContentLoaded", e)
    }
};


Strut.supports = {

        pointerEvents: function() {

            var e = document.createElement("a").style;
            // console.log(e);
            return e.cssText = "pointer-events:auto", e.pointerEvents === "auto"

        }(),
    },

    zekasaNavDropdowns.prototype.checkCollision = function() {

        var e = this;

        if (Strut.isMobileViewport) return;

        if (e.compact == 1) {

            var t = document.body.clientWidth,

                n = e.primaryNav.getBoundingClientRect();

            n.left + n.width / 2 > t / 2 && (e.container.classList.remove("test"), e.compact = !1)

        } else {

            var r = e.primaryNavItem.getBoundingClientRect(),

                i = e.secondaryNavItem.getBoundingClientRect();

            r.right > i.left && (e.container.classList.add("test"), e.compact = !0)

        }
    },


    zekasaNavDropdowns.prototype.openDropdown = function(e) {
        var t = this;
        if (this.activeDropdown === e) return;
        this.container.classList.add("overlayActive"), this.container.classList.add("dropdownActive"), this.activeDropdown = e, this.dropdownRoots.forEach(function(e, t) {
            e.classList.remove("active")
        }), e.classList.add("active");
        var n = e.getAttribute("data-dropdown"),
            r = "left",
            i, s, o;
        this.dropdownSections.forEach(function(e) {
            e.el.classList.remove("active"), e.el.classList.remove("left"), e.el.classList.remove("right"), e.name == n ? (e.el.classList.add("active"), r = "right", i = e.content.offsetWidth, s = e.content.offsetHeight, o = e.content) : e.el.classList.add(r)
        });
        var u = 520,
            a = 400,
            f = i / u,
            l = s / a,
            c = e.getBoundingClientRect(),
            h = c.left + c.width / 2 - i / 2;

        h = Math.round(Math.max(h, 10)), clearTimeout(this.disableTransitionTimeout), this.enableTransitionTimeout = setTimeout(function() {
            t.container.classList.remove("noDropdownTransition")
        }, 50), this.dropdownBackground.style.transform = "translateX(" + h + "px) scaleX(" + f + ") scaleY(" + l + ")", this.dropdownContainer.style.transform = "translateX(" + h + "px)", this.dropdownContainer.style.width = i + "px", this.dropdownContainer.style.height = s + "px";
        var p = Math.round(c.left + c.width / 2);

        this.dropdownArrow.style.transform = "translateX(" + p + "px) rotate(45deg)";

        var d = o.children[0].offsetHeight / l;

        this.dropdownBackgroundAlt.style.transform = "translateY(" + d + "px)"

    },
    zekasaNavDropdowns.prototype.closeDropdown = function() {

        var e = this;

        if (!this.activeDropdown) return;

        this.dropdownRoots.forEach(function(e, t) {

                e.classList.remove("active")

            }),

            clearTimeout(this.enableTransitionTimeout),

            this.container.classList.remove("overlayActive"),

            this.container.classList.remove("dropdownActive"),

            this.activeDropdown = undefined

    }, zekasaNavDropdowns.prototype.toggleDropdown = function(e) {
        this.activeDropdown === e ? this.closeDropdown() : this.openDropdown(e)
    }, zekasaNavDropdowns.prototype.startCloseTimeout = function() {
        var e = this;
        e.closeDropdownTimeout = setTimeout(function() {
            e.closeDropdown()
        }, 180)
    }, zekasaNavDropdowns.prototype.stopCloseTimeout = function() {
        var e = this;
        clearTimeout(e.closeDropdownTimeout)
    }, Strut.supports.pointerEvents, Strut.ready(function() {
        new zekasaNavDropdowns(".zekasaNav")
    });

/* Nav end */

/* Industry Nav pills */

$(document).on("click", "ul.tab-nav li", function(e) {
    let tab_content = $(this).children("a")[0].dataset.content;
    // console.log(tab_content);
    if ($("ul.tab-nav li").hasClass("active") && $("div.tab-content-indus").hasClass("active")) {
        $("ul.tab-nav li").removeClass("active");
        $("div.tab-content-indus").removeClass("active");
    }
    $(`#${tab_content}`).addClass("active");
    $(`#${tab_content}`).addClass("o_tip");
    $(this).addClass("active");

});


/* end of Industry nav pills */

/* Multilevel Sidebar - menu */

$(".go-tosub-menu").on("click", function(event) {
    let lsid = $(this).data("ls");
    let icon = $(this).data("icon");
    if ($(`#${lsid}`).hasClass("d-block")) {
        $(`#${lsid}`).parent("li").removeClass("show").addClass("showreverce");
        let $li = $("#navsidebar").children("ul").children("li");
        $(`#${lsid}`).parent("li").removeClass("show");
        setTimeout(() => {
            $.each($li, function(ix, list) {
                $(this).removeClass("d-none");
            });
            $("#navsidebar").children("ul").addClass("show");
            $(`#${lsid}`).parent("li").children("img").removeClass("d-none");
            $(`#${lsid}`).parent("li").find("a img:first").addClass("d-none");
            $(`#${lsid}`).parent("li").children("ul:first").removeClass("d-block").addClass("d-none");
            $(`#${lsid}`).parent("li").removeClass("showreverce");
            setTimeout(() => {
                $("#navsidebar").children("ul").removeClass("show");
            }, 500)
        }, 500)
    } else {
        if ($(`#${lsid}`).addClass("d-block")) {
            $(`#${lsid}`).parent("li").removeClass("showreverce").addClass("show").parent("li").children("img").addClass("d-none");
            $(`#${lsid}`).parent("li").children("img").addClass("d-none");
            $(`#${lsid}`).parent("li").find("a img:first").removeClass("d-none");
            let $li = $("#navsidebar").children("ul").children("li").not("li.show");
            $.each($li, function(ix, list) {
                $(this).addClass("d-none");
            });
        }
    }
});

$('#navsidebarCollapse').on('click', function() {
    $('#navsidebar').toggleClass('active');
    $("header.zekasaNav div.nav-wrapper").css({
        "left": "0px",
    });
    if ($(this).hasClass('active')) {
        $("header.zekasaNav div.nav-wrapper").css({
            "left": "-50px",
        });
    }
    $(this).toggleClass('active');
});
/* end multilevel sidebar */

$(document).ready(() => {
    $(".main_slider").owlCarousel({
        loop:true,
        nav:false,
        dots:true,
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 800,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
    if ($('#zekasa_logo').attr("src") == "/files/zekasa-white-logo.png") {
        $('#zekasa_logo').addClass('logo_width');
    } else {
        $('#zekasa_logo').addClass('logo_padding');
        $('#zekasa_logo').removeClass('logo_width');
      
    }
    $(window).bind('load scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll > 300) {
            $('.zekasaNav').addClass('animated');
            $(".zekasaNav").addClass("active");
            var newsrc = "/files/zekasa-black-logo.png";
            $('#zekasa_logo').attr("src", newsrc);
            $('#zekasa_logo').css({"width":"105px"});
            $('#zekasa_logo').css({'padding-top':'9px'});
            $('#zekasa_logo').css({'padding-left':'5px'});
            $('#zekasa_logo').removeClass('logo_width');
        }
        else {
            $(".zekasaNav").removeClass("active");
            $('.zekasaNav').removeClass('animated');
            var oldsrc = "/files/zekasa-white-logo.png";
            $('#zekasa_logo').attr("src", oldsrc);
            $('#zekasa_logo').css("width", "auto");
            $('#zekasa_logo').addClass('logo_width');
        }
    })

    /* canvas */
    /* smoke background */

    'use strict';
    Array.from(document.querySelectorAll('.smoke-canvas')).forEach((el) => {
        

    var canvas =el;

    canvas.width  = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    var config = {
        TEXTURE_DOWNSAMPLE: 1,
        DENSITY_DISSIPATION: 0.98,
        VELOCITY_DISSIPATION: 0.99,
        PRESSURE_DISSIPATION: 0.8,
        PRESSURE_ITERATIONS: 25,
        CURL: 30,
        SPLAT_RADIUS: 0.005
    };

    var pointers   = [];
    var splatStack = [];

    var _getWebGLContext     = getWebGLContext( canvas );
    var gl                   = _getWebGLContext.gl;
    var ext                  = _getWebGLContext.ext;
    var support_linear_float = _getWebGLContext.support_linear_float;

    function getWebGLContext( canvas ) {

        var params = {
            alpha: false,
            depth: false,
            stencil: false,
            antialias: false
        };

        var gl = canvas.getContext( 'webgl2', params );

        var isWebGL2 = !!gl;

        if ( !isWebGL2 ) gl = canvas.getContext( 'webgl', params ) || canvas.getContext( 'experimental-webgl', params );

        var halfFloat            = gl.getExtension( 'OES_texture_half_float' );
        var support_linear_float = gl.getExtension( 'OES_texture_half_float_linear' );

        if ( isWebGL2 ) {
            gl.getExtension( 'EXT_color_buffer_float' );
            support_linear_float = gl.getExtension( 'OES_texture_float_linear' );
        }

        gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

        var internalFormat   = isWebGL2 ? gl.RGBA16F : gl.RGBA;
        var internalFormatRG = isWebGL2 ? gl.RG16F : gl.RGBA;
        var formatRG         = isWebGL2 ? gl.RG : gl.RGBA;
        var texType          = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;

        return {
            gl: gl,
            ext: {
                internalFormat: internalFormat,
                internalFormatRG: internalFormatRG,
                formatRG: formatRG,
                texType: texType
            },
            support_linear_float: support_linear_float
        };
    }

    function pointerPrototype() {
        this.id    = -1;
        this.x     = 0;
        this.y     = 0;
        this.dx    = 0;
        this.dy    = 0;
        this.down  = false;
        this.moved = false;
        this.color = [ 30, 0, 300 ];
    }

    pointers.push( new pointerPrototype() );

    var GLProgram = function () {
        
        function GLProgram( vertexShader, fragmentShader ) {

            if ( !(this instanceof GLProgram) )
                throw new TypeError( "Cannot call a class as a function" );

            this.uniforms = {};
            this.program  = gl.createProgram();

            gl.attachShader( this.program, vertexShader );
            gl.attachShader( this.program, fragmentShader );
            gl.linkProgram( this.program );

            if ( !gl.getProgramParameter( this.program, gl.LINK_STATUS ) ) throw gl.getProgramInfoLog( this.program );

            var uniformCount = gl.getProgramParameter( this.program, gl.ACTIVE_UNIFORMS );
            
            for ( var i = 0; i < uniformCount; i++ ) {
                
                var uniformName = gl.getActiveUniform( this.program, i ).name;
                
                this.uniforms[ uniformName ] = gl.getUniformLocation( this.program, uniformName );
                
            }
        }

        GLProgram.prototype.bind = function bind() {
            gl.useProgram( this.program );
        };

        return GLProgram;
        
    }();

    function compileShader( type, source ) {

        var shader = gl.createShader( type );
        
        gl.shaderSource( shader, source );
        gl.compileShader( shader );

        if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) throw gl.getShaderInfoLog( shader );

        return shader;

    }

    var baseVertexShader               = compileShader( gl.VERTEX_SHADER, 'precision highp float; precision mediump sampler2D; attribute vec2 aPosition; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform vec2 texelSize; void main () {     vUv = aPosition * 0.5 + 0.5;     vL = vUv - vec2(texelSize.x, 0.0);     vR = vUv + vec2(texelSize.x, 0.0);     vT = vUv + vec2(0.0, texelSize.y);     vB = vUv - vec2(0.0, texelSize.y);     gl_Position = vec4(aPosition, 0.0, 1.0); }' );
    var clearShader                    = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; uniform sampler2D uTexture; uniform float value; void main () {     gl_FragColor = value * texture2D(uTexture, vUv); }' );
    var displayShader                  = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; uniform sampler2D uTexture; void main () {     gl_FragColor = texture2D(uTexture, vUv); }' );
    var splatShader                    = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius; void main () {     vec2 p = vUv - point.xy;     p.x *= aspectRatio;     vec3 splat = exp(-dot(p, p) / radius) * color;     vec3 base = texture2D(uTarget, vUv).xyz;     gl_FragColor = vec4(base + splat, 1.0); }' );
    var advectionManualFilteringShader = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform float dt; uniform float dissipation; vec4 bilerp (in sampler2D sam, in vec2 p) {     vec4 st;     st.xy = floor(p - 0.5) + 0.5;     st.zw = st.xy + 1.0;     vec4 uv = st * texelSize.xyxy;     vec4 a = texture2D(sam, uv.xy);     vec4 b = texture2D(sam, uv.zy);     vec4 c = texture2D(sam, uv.xw);     vec4 d = texture2D(sam, uv.zw);     vec2 f = p - st.xy;     return mix(mix(a, b, f.x), mix(c, d, f.x), f.y); } void main () {     vec2 coord = gl_FragCoord.xy - dt * texture2D(uVelocity, vUv).xy;     gl_FragColor = dissipation * bilerp(uSource, coord);     gl_FragColor.a = 1.0; }' );
    var advectionShader                = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform float dt; uniform float dissipation; void main () {     vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;     gl_FragColor = dissipation * texture2D(uSource, coord); }' );
    var divergenceShader               = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uVelocity; vec2 sampleVelocity (in vec2 uv) {     vec2 multiplier = vec2(1.0, 1.0);     if (uv.x < 0.0) { uv.x = 0.0; multiplier.x = -1.0; }     if (uv.x > 1.0) { uv.x = 1.0; multiplier.x = -1.0; }     if (uv.y < 0.0) { uv.y = 0.0; multiplier.y = -1.0; }     if (uv.y > 1.0) { uv.y = 1.0; multiplier.y = -1.0; }     return multiplier * texture2D(uVelocity, uv).xy; } void main () {     float L = sampleVelocity(vL).x;     float R = sampleVelocity(vR).x;     float T = sampleVelocity(vT).y;     float B = sampleVelocity(vB).y;     float div = 0.5 * (R - L + T - B);     gl_FragColor = vec4(div, 0.0, 0.0, 1.0); }' );
    var curlShader                     = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uVelocity; void main () {     float L = texture2D(uVelocity, vL).y;     float R = texture2D(uVelocity, vR).y;     float T = texture2D(uVelocity, vT).x;     float B = texture2D(uVelocity, vB).x;     float vorticity = R - L - T + B;     gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0); }' );
    var vorticityShader                = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt; void main () {     float L = texture2D(uCurl, vL).y;     float R = texture2D(uCurl, vR).y;     float T = texture2D(uCurl, vT).x;     float B = texture2D(uCurl, vB).x;     float C = texture2D(uCurl, vUv).x;     vec2 force = vec2(abs(T) - abs(B), abs(R) - abs(L));     force *= 1.0 / length(force + 0.00001) * curl * C;     vec2 vel = texture2D(uVelocity, vUv).xy;     gl_FragColor = vec4(vel + force * dt, 0.0, 1.0); }' );
    var pressureShader                 = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uPressure; uniform sampler2D uDivergence; vec2 boundary (in vec2 uv) {     uv = min(max(uv, 0.0), 1.0);     return uv; } void main () {     float L = texture2D(uPressure, boundary(vL)).x;     float R = texture2D(uPressure, boundary(vR)).x;     float T = texture2D(uPressure, boundary(vT)).x;     float B = texture2D(uPressure, boundary(vB)).x;     float C = texture2D(uPressure, vUv).x;     float divergence = texture2D(uDivergence, vUv).x;     float pressure = (L + R + B + T - divergence) * 0.25;     gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0); }' );
    var gradientSubtractShader         = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uPressure; uniform sampler2D uVelocity; vec2 boundary (in vec2 uv) {     uv = min(max(uv, 0.0), 1.0);     return uv; } void main () {     float L = texture2D(uPressure, boundary(vL)).x;     float R = texture2D(uPressure, boundary(vR)).x;     float T = texture2D(uPressure, boundary(vT)).x;     float B = texture2D(uPressure, boundary(vB)).x;     vec2 velocity = texture2D(uVelocity, vUv).xy;     velocity.xy -= vec2(R - L, T - B);     gl_FragColor = vec4(velocity, 0.0, 1.0); }' );

    var textureWidth  = void 0;
    var textureHeight = void 0;
    var density       = void 0;
    var velocity      = void 0;
    var divergence    = void 0;
    var curl          = void 0;
    var pressure      = void 0;

    initFramebuffers();

    var clearProgram           = new GLProgram( baseVertexShader, clearShader );
    var displayProgram         = new GLProgram( baseVertexShader, displayShader );
    var splatProgram           = new GLProgram( baseVertexShader, splatShader );
    var advectionProgram       = new GLProgram( baseVertexShader, support_linear_float ? advectionShader : advectionManualFilteringShader );
    var divergenceProgram      = new GLProgram( baseVertexShader, divergenceShader );
    var curlProgram            = new GLProgram( baseVertexShader, curlShader );
    var vorticityProgram       = new GLProgram( baseVertexShader, vorticityShader );
    var pressureProgram        = new GLProgram( baseVertexShader, pressureShader );
    var gradienSubtractProgram = new GLProgram( baseVertexShader, gradientSubtractShader );

    function initFramebuffers() {

        textureWidth  = gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE;
        textureHeight = gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE;

        var iFormat   = ext.internalFormat;
        var iFormatRG = ext.internalFormatRG;
        var formatRG  = ext.formatRG;
        var texType   = ext.texType;

        density    = createDoubleFBO( 0, textureWidth, textureHeight, iFormat, gl.RGBA, texType, support_linear_float ? gl.LINEAR : gl.NEAREST );
        velocity   = createDoubleFBO( 2, textureWidth, textureHeight, iFormatRG, formatRG, texType, support_linear_float ? gl.LINEAR : gl.NEAREST );
        divergence = createFBO( 4, textureWidth, textureHeight, iFormatRG, formatRG, texType, gl.NEAREST );
        curl       = createFBO( 5, textureWidth, textureHeight, iFormatRG, formatRG, texType, gl.NEAREST );
        pressure   = createDoubleFBO( 6, textureWidth, textureHeight, iFormatRG, formatRG, texType, gl.NEAREST );

    }

    function createFBO( texId, w, h, internalFormat, format, type, param ) {

        gl.activeTexture( gl.TEXTURE0 + texId );

        var texture = gl.createTexture();

        gl.bindTexture( gl.TEXTURE_2D, texture );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
        gl.texImage2D( gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null );

        var fbo = gl.createFramebuffer();

        gl.bindFramebuffer( gl.FRAMEBUFFER, fbo );
        gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0 );
        gl.viewport( 0, 0, w, h );
        gl.clear( gl.COLOR_BUFFER_BIT );

        return [ texture, fbo, texId ];

    }

    function createDoubleFBO( texId, w, h, internalFormat, format, type, param ) {

        var fbo1 = createFBO( texId, w, h, internalFormat, format, type, param );
        var fbo2 = createFBO( texId + 1, w, h, internalFormat, format, type, param );

        return {
            get first() {
                return fbo1;
            },
            get second() {
                return fbo2;
            },
            swap: function swap() {
                var temp = fbo1;

                fbo1 = fbo2;
                fbo2 = temp;
            }
        };

    }

    var blit = function () {

        gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer() );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( [ -1, -1, -1, 1, 1, 1, 1, -1 ] ), gl.STATIC_DRAW );
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer() );
        gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( [ 0, 1, 2, 0, 2, 3 ] ), gl.STATIC_DRAW );
        gl.vertexAttribPointer( 0, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( 0 );

        return function ( destination ) {
            gl.bindFramebuffer( gl.FRAMEBUFFER, destination );
            gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0 );
        };

    }();

    var lastTime = Date.now();

    update();

    function update() {

        resizeCanvas();

        var dt = Math.min( (Date.now() - lastTime) / 1000, 0.016 );
        lastTime = Date.now();

        gl.viewport( 0, 0, textureWidth, textureHeight );

        if ( splatStack.length > 0 ) {
            for ( var m = 0; m < splatStack.pop(); m++ ) {

                var color = [ Math.random() * 10, Math.random() * 10, Math.random() * 10 ];
                var x     = canvas.width * Math.random();
                var y     = canvas.height * Math.random();
                var dx    = 1000 * (Math.random() - 0.5);
                var dy    = 1000 * (Math.random() - 0.5);

                splat( x, y, dx, dy, color );
            }
        }

        advectionProgram.bind();
        gl.uniform2f( advectionProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight );
        gl.uniform1i( advectionProgram.uniforms.uVelocity, velocity.first[ 2 ] );
        gl.uniform1i( advectionProgram.uniforms.uSource, velocity.first[ 2 ] );
        gl.uniform1f( advectionProgram.uniforms.dt, dt );
        gl.uniform1f( advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION );
        blit( velocity.second[ 1 ] );
        velocity.swap();

        gl.uniform1i( advectionProgram.uniforms.uVelocity, velocity.first[ 2 ] );
        gl.uniform1i( advectionProgram.uniforms.uSource, density.first[ 2 ] );
        gl.uniform1f( advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION );
        blit( density.second[ 1 ] );
        density.swap();

        for ( var i = 0, len =  pointers.length; i < len; i++ ) {
            var pointer = pointers[ i ];

            if ( pointer.moved ) {
                splat( pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color );
                pointer.moved = false;
            }
        }

        curlProgram.bind();
        gl.uniform2f( curlProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight );
        gl.uniform1i( curlProgram.uniforms.uVelocity, velocity.first[ 2 ] );
        blit( curl[ 1 ] );

        vorticityProgram.bind();
        gl.uniform2f( vorticityProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight );
        gl.uniform1i( vorticityProgram.uniforms.uVelocity, velocity.first[ 2 ] );
        gl.uniform1i( vorticityProgram.uniforms.uCurl, curl[ 2 ] );
        gl.uniform1f( vorticityProgram.uniforms.curl, config.CURL );
        gl.uniform1f( vorticityProgram.uniforms.dt, dt );
        blit( velocity.second[ 1 ] );
        velocity.swap();

        divergenceProgram.bind();
        gl.uniform2f( divergenceProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight );
        gl.uniform1i( divergenceProgram.uniforms.uVelocity, velocity.first[ 2 ] );
        blit( divergence[ 1 ] );

        clearProgram.bind();

        var pressureTexId = pressure.first[ 2 ];

        gl.activeTexture( gl.TEXTURE0 + pressureTexId );
        gl.bindTexture( gl.TEXTURE_2D, pressure.first[ 0 ] );
        gl.uniform1i( clearProgram.uniforms.uTexture, pressureTexId );
        gl.uniform1f( clearProgram.uniforms.value, config.PRESSURE_DISSIPATION );
        blit( pressure.second[ 1 ] );
        pressure.swap();

        pressureProgram.bind();
        gl.uniform2f( pressureProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight );
        gl.uniform1i( pressureProgram.uniforms.uDivergence, divergence[ 2 ] );
        pressureTexId = pressure.first[ 2 ];
        gl.activeTexture( gl.TEXTURE0 + pressureTexId );

        for ( var _i = 0; _i < config.PRESSURE_ITERATIONS; _i++ ) {
            gl.bindTexture( gl.TEXTURE_2D, pressure.first[ 0 ] );
            gl.uniform1i( pressureProgram.uniforms.uPressure, pressureTexId );
            blit( pressure.second[ 1 ] );
            pressure.swap();
        }

        gradienSubtractProgram.bind();
        gl.uniform2f( gradienSubtractProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight );
        gl.uniform1i( gradienSubtractProgram.uniforms.uPressure, pressure.first[ 2 ] );
        gl.uniform1i( gradienSubtractProgram.uniforms.uVelocity, velocity.first[ 2 ] );
        blit( velocity.second[ 1 ] );
        velocity.swap();

        gl.viewport( 0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight );
        displayProgram.bind();
        gl.uniform1i( displayProgram.uniforms.uTexture, density.first[ 2 ] );
        blit( null );

        requestAnimationFrame( update );

    }

    function splat( x, y, dx, dy, color ) {

        splatProgram.bind();
        gl.uniform1i( splatProgram.uniforms.uTarget, velocity.first[ 2 ] );
        gl.uniform1f( splatProgram.uniforms.aspectRatio, canvas.width / canvas.height );
        gl.uniform2f( splatProgram.uniforms.point, x / canvas.width, 1.0 - y / canvas.height );
        gl.uniform3f( splatProgram.uniforms.color, dx, -dy, 1.0 );
        gl.uniform1f( splatProgram.uniforms.radius, config.SPLAT_RADIUS );
        blit( velocity.second[ 1 ] );
        velocity.swap();

        gl.uniform1i( splatProgram.uniforms.uTarget, density.first[ 2 ] );
        gl.uniform3f( splatProgram.uniforms.color, color[ 0 ] * 0.3, color[ 1 ] * 0.3, color[ 2 ] * 0.3 );
        blit( density.second[ 1 ] );
        density.swap();

    }

    function resizeCanvas() {

        ( canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight ) && ( canvas.width  = canvas.clientWidth, canvas.height = canvas.clientHeight, initFramebuffers() );

    }

    var count    = 0;
    var colorArr = [ Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.2 ];

    canvas.addEventListener( 'mousemove', function ( e ) {

        count++;

        ( count > 25 ) && (colorArr = [ Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.2 ], count = 0);

        pointers[ 0 ].down  = true;
        pointers[ 0 ].color = colorArr;
        pointers[ 0 ].moved = pointers[ 0 ].down;
        pointers[ 0 ].dx    = (e.offsetX - pointers[ 0 ].x) * 10.0;
        pointers[ 0 ].dy    = (e.offsetY - pointers[ 0 ].y) * 10.0;
        pointers[ 0 ].x     = e.offsetX;
        pointers[ 0 ].y     = e.offsetY;

    } );

    canvas.addEventListener( 'touchmove', function ( e ) {

        e.preventDefault();

        var touches = e.targetTouches;

        count++;

        ( count > 25 ) && (colorArr = [ Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.2 ], count = 0);

        for ( var i = 0, len = touches.length; i < len; i++ ) {

            if ( i >= pointers.length ) pointers.push( new pointerPrototype() );

            pointers[ i ].id    = touches[ i ].identifier;
            pointers[ i ].down  = true;
            pointers[ i ].x     = touches[ i ].pageX;
            pointers[ i ].y     = touches[ i ].pageY;
            pointers[ i ].color = colorArr;

            var pointer = pointers[ i ];

            pointer.moved = pointer.down;
            pointer.dx    = (touches[ i ].pageX - pointer.x) * 10.0;
            pointer.dy    = (touches[ i ].pageY - pointer.y) * 10.0;
            pointer.x     = touches[ i ].pageX;
            pointer.y     = touches[ i ].pageY;

        }

    }, false );

    function m( t ) {

        for ( var e, n = document.getElementById( t ), i = n.innerHTML.replace( "&amp;", "&" ).split( "" ), a = "", o = 0, s = i.length; s > o; o++ ) {
            e = i[ o ].replace( "&", "&amp" );
            a += e.trim() ? '<span class="letter-' + o + '">' + e + "</span>" : "&nbsp;";
        }

        n.innerHTML = a;

        setTimeout( function () {
            n.className = "transition-in";
        }, 500 * Math.random() + 500 );

    }

    window.onload = function() {
        m( "h1" );
    };
    });

})


/* hover.js */

var hoverEffect = function(opts) {
    var vertex = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `;

    var fragment = `
        varying vec2 vUv;

        uniform sampler2D texture;
        uniform sampler2D texture2;
        uniform sampler2D disp;

        // uniform float time;
        // uniform float _rot;
        uniform float dispFactor;
        uniform float effectFactor;

        // vec2 rotate(vec2 v, float a) {
        //  float s = sin(a);
        //  float c = cos(a);
        //  mat2 m = mat2(c, -s, s, c);
        //  return m * v;
        // }

        void main() {

            vec2 uv = vUv;

            // uv -= 0.5;
            // vec2 rotUV = rotate(uv, _rot);
            // uv += 0.5;

            vec4 disp = texture2D(disp, uv);

            vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
            vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);

            vec4 _texture = texture2D(texture, distortedPosition);
            vec4 _texture2 = texture2D(texture2, distortedPosition2);

            vec4 finalTexture = mix(_texture, _texture2, dispFactor);

            gl_FragColor = finalTexture;
            // gl_FragColor = disp;
        }
    `;

    var parent = opts.parent || console.warn("no parent");
    var dispImage = opts.displacementImage || console.warn("displacement image missing");
    var image1 = opts.image1 || console.warn("first image missing");
    var image2 = opts.image2 || console.warn("second image missing");
    var intensity = opts.intensity || 1;
    var speedIn = opts.speedIn || 1.6;
    var speedOut = opts.speedOut || 1.2;
    var userHover = (opts.hover === undefined) ? true : opts.hover;
    var easing = opts.easing || Expo.easeOut;

    var mobileAndTabletcheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    var scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera(
        parent.offsetWidth / -2,
        parent.offsetWidth / 2,
        parent.offsetHeight / 2,
        parent.offsetHeight / -2,
        1,
        1000
    );

    camera.position.z = 1;

    var renderer = new THREE.WebGLRenderer({
        antialias: false,
        // alpha: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0.0);
    renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    parent.appendChild(renderer.domElement);

    // var addToGPU = function(t) {
    //     renderer.setTexture2D(t, 0);
    // };

    var loader = new THREE.TextureLoader();
    loader.crossOrigin = "";
    var texture1 = loader.load(image1);
    var texture2 = loader.load(image2);

    var disp = loader.load(dispImage);
    disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

    texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
    texture1.minFilter = texture2.minFilter = THREE.LinearFilter;

    texture1.anisotropy = renderer.getMaxAnisotropy();
    texture2.anisotropy = renderer.getMaxAnisotropy();

    var mat = new THREE.ShaderMaterial({
        uniforms: {
            effectFactor: { type: "f", value: intensity },
            dispFactor: { type: "f", value: 0.0 },
            texture: { type: "t", value: texture1 },
            texture2: { type: "t", value: texture2 },
            disp: { type: "t", value: disp }
        },

        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        opacity: 1.0
    });

    var geometry = new THREE.PlaneBufferGeometry(
        parent.offsetWidth,
        parent.offsetHeight,
        1
    );
    var object = new THREE.Mesh(geometry, mat);
    scene.add(object);

    var addEvents = function(){
        var evtIn = "mouseenter";
        var evtOut = "mouseleave";
        if (mobileAndTabletcheck()) {
            evtIn = "touchstart";
            evtOut = "touchend";
        }
        parent.addEventListener(evtIn, function(e) {
            TweenMax.to(mat.uniforms.dispFactor, speedIn, {
                value: 1,
                ease: easing
            });
        });

        parent.addEventListener(evtOut, function(e) {
            TweenMax.to(mat.uniforms.dispFactor, speedOut, {
                value: 0,
                ease: easing
            });
        });
    };

    if (userHover) {
        addEvents();
    }

    window.addEventListener("resize", function(e) {
        renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    });


    this.next = function(){
        TweenMax.to(mat.uniforms.dispFactor, speedIn, {
            value: 1,
            ease: easing
        });
    }

    this.previous = function(){
        TweenMax.to(mat.uniforms.dispFactor, speedOut, {
            value: 0,
            ease: easing
        });
    };

    var animate = function() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    };
    animate();
};

Array.from(document.querySelectorAll('.grid__item-img')).forEach((el) => {
    const imgs = Array.from(el.querySelectorAll('img'));
    new hoverEffect({
        parent: el,
        intensity: el.dataset.intensity || undefined,
        speedIn: el.dataset.speedin || undefined,
        speedOut: el.dataset.speedout || undefined,
        easing: el.dataset.easing || undefined,
        hover: el.dataset.hover || undefined,
        image1: imgs[0].getAttribute('src'),
        image2: imgs[1].getAttribute('src'),
        displacementImage: el.dataset.displacement
    });
});
$(document).ready(function () {
    var scrollController = new ScrollMagic.Controller();
    $(".fadeinright").each(function () {

        new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.8,
        })
            .setTween(TweenMax.from(this, 0.9, {
                x: 50,
                opacity: 0,
                ease: Linear.easeNone,
            }))
            .addTo(scrollController)
    })
    $(".fadeinleft").each(function () {

        new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.8,
        })
            .setTween(TweenMax.from(this, 0.9, {
                x: -50,
                opacity: 0,
                ease: Linear.easeNone,
            }))
            .addTo(scrollController)
    })
   
        $('.product-slider').owlCarousel({
            items:4,
            // loop:true,
            // margin:10,
            // // nav:true,
            // autoplay:true,
            // autoplayTimeout:1500,
            // autoplayHoverPause:true
            loop:true,
            margin:20,
            nav:false,
            dots:true,
            autoplay: true, 
            smartSpeed: 1500
            // autoplay: true,
            // slideTransition: 'linear',
            // autoplayTimeout: 1500,
            // autoplaySpeed: 1000,
            // autoplayHoverPause: true,
        });
})
