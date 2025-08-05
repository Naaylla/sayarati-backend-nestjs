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
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-c8542d2f393506816829276fd73d1735a4dc136f31798b5cf81681c4325b66aa390cc2e4dbf2890df989163292a8dc2b57471b6f05c6b7e49fc7f7ff059e16f6"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-c8542d2f393506816829276fd73d1735a4dc136f31798b5cf81681c4325b66aa390cc2e4dbf2890df989163292a8dc2b57471b6f05c6b7e49fc7f7ff059e16f6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-c8542d2f393506816829276fd73d1735a4dc136f31798b5cf81681c4325b66aa390cc2e4dbf2890df989163292a8dc2b57471b6f05c6b7e49fc7f7ff059e16f6"' :
                                            'id="xs-controllers-links-module-AuthModule-c8542d2f393506816829276fd73d1735a4dc136f31798b5cf81681c4325b66aa390cc2e4dbf2890df989163292a8dc2b57471b6f05c6b7e49fc7f7ff059e16f6"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-c8542d2f393506816829276fd73d1735a4dc136f31798b5cf81681c4325b66aa390cc2e4dbf2890df989163292a8dc2b57471b6f05c6b7e49fc7f7ff059e16f6"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-c8542d2f393506816829276fd73d1735a4dc136f31798b5cf81681c4325b66aa390cc2e4dbf2890df989163292a8dc2b57471b6f05c6b7e49fc7f7ff059e16f6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-c8542d2f393506816829276fd73d1735a4dc136f31798b5cf81681c4325b66aa390cc2e4dbf2890df989163292a8dc2b57471b6f05c6b7e49fc7f7ff059e16f6"' :
                                        'id="xs-injectables-links-module-AuthModule-c8542d2f393506816829276fd73d1735a4dc136f31798b5cf81681c4325b66aa390cc2e4dbf2890df989163292a8dc2b57471b6f05c6b7e49fc7f7ff059e16f6"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProfileModule-72c565e989620064ca25d226500c5a3e51e9c9a0fbaa27f6c7915e124acf4c6536c0c2eabb4d131fc62e031aae9359a59776f50e02649f60e842a1782ba9c062"' : 'data-bs-target="#xs-controllers-links-module-ProfileModule-72c565e989620064ca25d226500c5a3e51e9c9a0fbaa27f6c7915e124acf4c6536c0c2eabb4d131fc62e031aae9359a59776f50e02649f60e842a1782ba9c062"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProfileModule-72c565e989620064ca25d226500c5a3e51e9c9a0fbaa27f6c7915e124acf4c6536c0c2eabb4d131fc62e031aae9359a59776f50e02649f60e842a1782ba9c062"' :
                                            'id="xs-controllers-links-module-ProfileModule-72c565e989620064ca25d226500c5a3e51e9c9a0fbaa27f6c7915e124acf4c6536c0c2eabb4d131fc62e031aae9359a59776f50e02649f60e842a1782ba9c062"' }>
                                            <li class="link">
                                                <a href="controllers/ProfileController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProfileModule-72c565e989620064ca25d226500c5a3e51e9c9a0fbaa27f6c7915e124acf4c6536c0c2eabb4d131fc62e031aae9359a59776f50e02649f60e842a1782ba9c062"' : 'data-bs-target="#xs-injectables-links-module-ProfileModule-72c565e989620064ca25d226500c5a3e51e9c9a0fbaa27f6c7915e124acf4c6536c0c2eabb4d131fc62e031aae9359a59776f50e02649f60e842a1782ba9c062"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProfileModule-72c565e989620064ca25d226500c5a3e51e9c9a0fbaa27f6c7915e124acf4c6536c0c2eabb4d131fc62e031aae9359a59776f50e02649f60e842a1782ba9c062"' :
                                        'id="xs-injectables-links-module-ProfileModule-72c565e989620064ca25d226500c5a3e51e9c9a0fbaa27f6c7915e124acf4c6536c0c2eabb4d131fc62e031aae9359a59776f50e02649f60e842a1782ba9c062"' }>
                                        <li class="link">
                                            <a href="injectables/ProfileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-646ce45e181f63c1d987bb660610a4bf960cf62eb3ad7a372d38486cdb28e853d6f2885d881c1327afb1ad17fd5986976384158b4fd19fefbf3033d17331f5e5"' : 'data-bs-target="#xs-controllers-links-module-UserModule-646ce45e181f63c1d987bb660610a4bf960cf62eb3ad7a372d38486cdb28e853d6f2885d881c1327afb1ad17fd5986976384158b4fd19fefbf3033d17331f5e5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-646ce45e181f63c1d987bb660610a4bf960cf62eb3ad7a372d38486cdb28e853d6f2885d881c1327afb1ad17fd5986976384158b4fd19fefbf3033d17331f5e5"' :
                                            'id="xs-controllers-links-module-UserModule-646ce45e181f63c1d987bb660610a4bf960cf62eb3ad7a372d38486cdb28e853d6f2885d881c1327afb1ad17fd5986976384158b4fd19fefbf3033d17331f5e5"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-646ce45e181f63c1d987bb660610a4bf960cf62eb3ad7a372d38486cdb28e853d6f2885d881c1327afb1ad17fd5986976384158b4fd19fefbf3033d17331f5e5"' : 'data-bs-target="#xs-injectables-links-module-UserModule-646ce45e181f63c1d987bb660610a4bf960cf62eb3ad7a372d38486cdb28e853d6f2885d881c1327afb1ad17fd5986976384158b4fd19fefbf3033d17331f5e5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-646ce45e181f63c1d987bb660610a4bf960cf62eb3ad7a372d38486cdb28e853d6f2885d881c1327afb1ad17fd5986976384158b4fd19fefbf3033d17331f5e5"' :
                                        'id="xs-injectables-links-module-UserModule-646ce45e181f63c1d987bb660610a4bf960cf62eb3ad7a372d38486cdb28e853d6f2885d881c1327afb1ad17fd5986976384158b4fd19fefbf3033d17331f5e5"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
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
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProfileController.html" data-type="entity-link" >ProfileController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Account.html" data-type="entity-link" >Account</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Profile.html" data-type="entity-link" >Profile</a>
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
                                <a href="classes/Account.html" data-type="entity-link" >Account</a>
                            </li>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProfileDto.html" data-type="entity-link" >CreateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProfileDto.html" data-type="entity-link" >UpdateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
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
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileService.html" data-type="entity-link" >ProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
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
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
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