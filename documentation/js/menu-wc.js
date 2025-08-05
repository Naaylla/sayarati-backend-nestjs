'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">sayarati-backend-nestjs documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-f3802770500e7de0c009bfe8dc40cebcb53f108574d6b4512a16cf13b95f06cc7557a069a4cffb66f274a0ae447b7545504a6d4d51dfb55494f6810f865ad2b8"' : 'data-bs-target="#xs-controllers-links-module-AppModule-f3802770500e7de0c009bfe8dc40cebcb53f108574d6b4512a16cf13b95f06cc7557a069a4cffb66f274a0ae447b7545504a6d4d51dfb55494f6810f865ad2b8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-f3802770500e7de0c009bfe8dc40cebcb53f108574d6b4512a16cf13b95f06cc7557a069a4cffb66f274a0ae447b7545504a6d4d51dfb55494f6810f865ad2b8"' :
                                            'id="xs-controllers-links-module-AppModule-f3802770500e7de0c009bfe8dc40cebcb53f108574d6b4512a16cf13b95f06cc7557a069a4cffb66f274a0ae447b7545504a6d4d51dfb55494f6810f865ad2b8"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-f3802770500e7de0c009bfe8dc40cebcb53f108574d6b4512a16cf13b95f06cc7557a069a4cffb66f274a0ae447b7545504a6d4d51dfb55494f6810f865ad2b8"' : 'data-bs-target="#xs-injectables-links-module-AppModule-f3802770500e7de0c009bfe8dc40cebcb53f108574d6b4512a16cf13b95f06cc7557a069a4cffb66f274a0ae447b7545504a6d4d51dfb55494f6810f865ad2b8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-f3802770500e7de0c009bfe8dc40cebcb53f108574d6b4512a16cf13b95f06cc7557a069a4cffb66f274a0ae447b7545504a6d4d51dfb55494f6810f865ad2b8"' :
                                        'id="xs-injectables-links-module-AppModule-f3802770500e7de0c009bfe8dc40cebcb53f108574d6b4512a16cf13b95f06cc7557a069a4cffb66f274a0ae447b7545504a6d4d51dfb55494f6810f865ad2b8"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' :
                                            'id="xs-controllers-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' :
                                        'id="xs-injectables-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link" >CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthDto.html" data-type="entity-link" >UpdateAuthDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});